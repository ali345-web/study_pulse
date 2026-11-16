/**
 * StudyPulse Live Class & Interactive Streaming Studio
 * 
 * Features:
 * - Admin/Teacher: Live Broadcasting (Camera, Mic, Screen Share, YouTube/HLS stream)
 * - Students: View & Listen ONLY mode (Strictly audio/video playback, no student camera/mic)
 * - Live Interactive Comments: Real-time discussion, teacher badges, comment deletion & message pinning
 * - Active Viewer presence & Heartbeat counter
 * - Automatic background Live notification on Student Dashboard & Nav bar
 */

const LiveStudio = (function () {
  let activeStream = null;
  let activeAudioTrack = null;
  let activeVideoTrack = null;
  let isMicMuted = false;
  let isCameraOff = false;
  let currentFacingMode = 'user';
  let liveTimerInterval = null;
  let liveStartTime = null;
  let commentPollInterval = null;
  let lastCommentTimestamp = 0;
  let studentHeartbeatInterval = null;
  let globalLiveCheckInterval = null;
  let isCurrentAdminLive = false;
  let teacherPeerConnections = {};
  let teacherSignalPollInterval = null;
  let studentPeerConnection = null;
  let studentSignalPollInterval = null;

  // Local BroadcastChannel for seamless instant cross-tab / local network streaming
  let streamBroadcastChannel = null;
  try {
    streamBroadcastChannel = new BroadcastChannel('studypulse_live_stream');
  } catch (e) {
    console.warn('BroadcastChannel not supported in this environment');
  }

  // ==========================================
  // UTILITIES
  // ==========================================
  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function getSessionUser() {
    try {
      const user = JSON.parse(localStorage.getItem('studypulse_session') || 'null');
      if (user && user.name) return user;
    } catch (e) {}
    return { name: 'Student', id: 'usr_' + Math.random().toString(36).substr(2, 6) };
  }

  // ==========================================
  // 1. ADMIN LIVE BROADCASTING STUDIO
  // ==========================================
  async function initAdminStudio() {
    console.log('[LiveStudio] Initializing Admin Live Studio...');
    const videoEl = document.getElementById('admin-live-video');
    const startBtn = document.getElementById('btn-admin-start-live');
    const endBtn = document.getElementById('btn-admin-end-live');

    // Attach listeners
    setupAdminControls();
    await checkAdminLiveStatus();

    // Start background comment polling if live
    startCommentPolling(true);

    // Heartbeat for admin
    setInterval(async () => {
      try {
        if (window.StudyPulseAPI && window.StudyPulseAPI.live) {
          const res = await window.StudyPulseAPI.live.heartbeat('admin_broadcaster');
          if (res && res.activeViewers !== undefined) {
            updateViewerCountUI(res.activeViewers);
          }
        }
      } catch (e) {}
    }, 8000);
  }

  function setupAdminControls() {
    // Mode switcher buttons
    const modeCamera = document.getElementById('stream-mode-camera');
    const modeScreen = document.getElementById('stream-mode-screen');
    const modeUrl = document.getElementById('stream-mode-url');

    if (modeCamera) modeCamera.addEventListener('click', () => switchStreamMode('camera_mic'));
    if (modeScreen) modeScreen.addEventListener('click', () => switchStreamMode('screen_share'));
    if (modeUrl) modeUrl.addEventListener('click', () => switchStreamMode('stream_url'));

    // Mic & Camera Toggle buttons
    const btnToggleMic = document.getElementById('btn-toggle-mic');
    if (btnToggleMic) {
      btnToggleMic.addEventListener('click', () => {
        if (activeAudioTrack) {
          isMicMuted = !isMicMuted;
          activeAudioTrack.enabled = !isMicMuted;
          btnToggleMic.innerHTML = isMicMuted 
            ? '<i class="fa-solid fa-microphone-slash text-rose-500"></i><span>Mic Muted</span>'
            : '<i class="fa-solid fa-microphone text-emerald-500"></i><span>Mic ON</span>';
        }
      });
    }

    const btnFlipCamera = document.getElementById('btn-flip-camera');
    if (btnFlipCamera) {
      btnFlipCamera.addEventListener('click', async () => {
        currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
        btnFlipCamera.classList.add('scale-95');
        setTimeout(() => btnFlipCamera.classList.remove('scale-95'), 150);
        await startLocalMedia(false);
      });
    }

    const btnToggleCamera = document.getElementById('btn-toggle-camera');
    if (btnToggleCamera) {
      btnToggleCamera.addEventListener('click', () => {
        if (activeVideoTrack) {
          isCameraOff = !isCameraOff;
          activeVideoTrack.enabled = !isCameraOff;
          btnToggleCamera.innerHTML = isCameraOff
            ? '<i class="fa-solid fa-video-slash text-rose-500"></i><span>Camera Off</span>'
            : '<i class="fa-solid fa-video text-emerald-500"></i><span>Camera ON</span>';
        }
      });
    }

    // Start & End Buttons
    const startBtn = document.getElementById('btn-admin-start-live');
    if (startBtn) startBtn.addEventListener('click', handleAdminStartLive);

    const endBtn = document.getElementById('btn-admin-end-live');
    if (endBtn) endBtn.addEventListener('click', handleAdminEndLive);

    // Admin comment send
    const sendCommentBtn = document.getElementById('btn-admin-send-comment');
    const commentInput = document.getElementById('admin-live-comment-input');
    if (sendCommentBtn && commentInput) {
      const sendComment = async () => {
        const text = commentInput.value.trim();
        if (!text) return;
        commentInput.value = '';
        try {
          await window.StudyPulseAPI.live.postComment({
            text,
            userName: 'Teacher ⭐',
            userId: 'admin'
          });
          await loadComments(true);
        } catch (e) {
          alert('Comment bhejne me error: ' + e.message);
        }
      };

      sendCommentBtn.addEventListener('click', sendComment);
      commentInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendComment();
      });
    }

    // Pin Message
    const pinBtn = document.getElementById('btn-admin-pin-message');
    const pinInput = document.getElementById('admin-pin-input');
    if (pinBtn && pinInput) {
      pinBtn.addEventListener('click', async () => {
        const msg = pinInput.value.trim();
        if (!msg) return;
        try {
          await window.StudyPulseAPI.live.pinMessage(msg);
          alert('Notice/Message sabhi vidyarthiyo ke liye pin ho gaya!');
        } catch (e) {
          alert('Pin karne me error: ' + e.message);
        }
      });
    }
  }

  function switchStreamMode(mode) {
    const urlContainer = document.getElementById('custom-url-container');
    const previewContainer = document.getElementById('camera-preview-container');

    ['camera', 'screen', 'url'].forEach(m => {
      const btn = document.getElementById(`stream-mode-${m}`);
      if (btn) {
        btn.classList.remove('bg-brand-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      }
    });

    const activeBtn = document.getElementById(`stream-mode-${mode === 'camera_mic' ? 'camera' : mode === 'screen_share' ? 'screen' : 'url'}`);
    if (activeBtn) {
      activeBtn.classList.add('bg-brand-600', 'text-white', 'shadow-md');
      activeBtn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
    }

    if (mode === 'stream_url') {
      if (urlContainer) urlContainer.classList.remove('hidden');
      if (previewContainer) previewContainer.classList.add('hidden');
    } else {
      if (urlContainer) urlContainer.classList.add('hidden');
      if (previewContainer) previewContainer.classList.remove('hidden');
      startLocalMedia(mode === 'screen_share');
    }
  }

  async function startLocalMedia(isScreen = false) {
    try {
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
      }

      if (isScreen) {
        activeStream = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: "always" },
          audio: true
        });
      } else {
        const videoConstraints = {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: { ideal: currentFacingMode }
        };
        activeStream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
          audio: true
        });
      }

      activeAudioTrack = activeStream.getAudioTracks()[0];
      activeVideoTrack = activeStream.getVideoTracks()[0];

      const videoEl = document.getElementById('admin-live-video');
      if (videoEl) {
        videoEl.srcObject = activeStream;
        videoEl.play().catch(() => {});
      }

      const placeholder = document.getElementById('admin-camera-placeholder');
      if (placeholder) placeholder.classList.add('hidden');
    } catch (err) {
      console.warn('[LiveStudio] Camera/Screen access error or cancelled:', err);
      // Fallback: draw simulated chalkboard waveform stream
      startSimulatedTeacherStream();
    }
  }

  function startSimulatedTeacherStream() {
    const videoEl = document.getElementById('admin-live-video');
    const placeholder = document.getElementById('admin-camera-placeholder');
    if (placeholder) placeholder.classList.remove('hidden');
  }

  async function handleAdminStartLive() {
    const titleInput = document.getElementById('admin-live-title');
    const subjectSelect = document.getElementById('admin-live-subject');
    const streamUrlInput = document.getElementById('admin-stream-url');

    const title = (titleInput && titleInput.value.trim()) || 'StudyPulse Special Live Class';
    const subject = (subjectSelect && subjectSelect.value) || 'General Science';
    const streamUrl = (streamUrlInput && streamUrlInput.value.trim()) || '';

    // Determine stream type
    const isUrlMode = !document.getElementById('custom-url-container').classList.contains('hidden');
    const streamType = isUrlMode ? 'stream_url' : (activeStream && activeStream.getVideoTracks()[0]?.label?.includes('screen') ? 'screen_share' : 'camera_mic');

    try {
      const res = await window.StudyPulseAPI.live.start({
        title,
        subject,
        streamType,
        streamUrl,
        teacherName: 'Super Admin'
      });

      if (res && res.success) {
        isCurrentAdminLive = true;
        setAdminLiveUI(true, res.live);
        startLiveTimer();
        startTeacherSignaling();

        // Broadcast to local tabs
        if (streamBroadcastChannel) {
          streamBroadcastChannel.postMessage({ type: 'LIVE_STARTED', live: res.live });
        }
      } else {
        alert(res.message || 'Live shuru nahi ho paya.');
      }
    } catch (e) {
      alert('Error starting live: ' + e.message);
    }
  }

  async function handleAdminEndLive() {
    if (!confirm('Kya aap sach me Live Class samapt (end) karna chahte hain?')) return;

    try {
      const res = await window.StudyPulseAPI.live.end();
      if (res && res.success) {
        isCurrentAdminLive = false;
        setAdminLiveUI(false);
        stopLiveTimer();

        if (activeStream) {
          activeStream.getTracks().forEach(t => t.stop());
          activeStream = null;
        }

        const videoEl = document.getElementById('admin-live-video');
        if (videoEl) videoEl.srcObject = null;

        if (teacherSignalPollInterval) clearInterval(teacherSignalPollInterval);
        Object.values(teacherPeerConnections).forEach(pc => {
          try { pc.close(); } catch (e) {}
        });
        teacherPeerConnections = {};

        if (streamBroadcastChannel) {
          streamBroadcastChannel.postMessage({ type: 'LIVE_ENDED' });
        }
      }
    } catch (e) {
      alert('Error ending live: ' + e.message);
    }
  }

  function setAdminLiveUI(isLive, data = {}) {
    const startCard = document.getElementById('admin-start-card');
    const liveCard = document.getElementById('admin-active-card');
    const statusBadge = document.getElementById('admin-status-badge');

    if (isLive) {
      if (startCard) startCard.classList.add('hidden');
      if (liveCard) liveCard.classList.remove('hidden');
      if (statusBadge) {
        statusBadge.innerHTML = '<span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span><span class="text-rose-500 font-black">🔴 LIVE NOW</span>';
      }
      const titleEl = document.getElementById('admin-current-title');
      if (titleEl) titleEl.textContent = data.title || 'Live Class';
      const subjEl = document.getElementById('admin-current-subject');
      if (subjEl) subjEl.textContent = data.subject || 'All Exams';
    } else {
      if (startCard) startCard.classList.remove('hidden');
      if (liveCard) liveCard.classList.add('hidden');
      if (statusBadge) {
        statusBadge.innerHTML = '<span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span><span class="text-slate-400 font-bold">⚪ OFFLINE</span>';
      }
    }
  }

  function startLiveTimer() {
    liveStartTime = Date.now();
    const timerEl = document.getElementById('admin-live-timer');
    if (liveTimerInterval) clearInterval(liveTimerInterval);

    liveTimerInterval = setInterval(() => {
      if (!liveStartTime) return;
      const elapsed = Math.floor((Date.now() - liveStartTime) / 1000);
      if (timerEl) timerEl.textContent = formatTime(elapsed);
    }, 1000);
  }

  function stopLiveTimer() {
    if (liveTimerInterval) clearInterval(liveTimerInterval);
    liveTimerInterval = null;
    liveStartTime = null;
    const timerEl = document.getElementById('admin-live-timer');
    if (timerEl) timerEl.textContent = '00:00:00';
  }

  async function checkAdminLiveStatus() {
    try {
      const res = await window.StudyPulseAPI.live.getStatus();
      if (res && res.success && res.live) {
        isCurrentAdminLive = res.live.isLive;
        setAdminLiveUI(res.live.isLive, res.live);
        if (res.live.isLive && res.live.startedAt) {
          liveStartTime = new Date(res.live.startedAt).getTime();
          startLiveTimer();
        startTeacherSignaling();
        }
        updateViewerCountUI(res.live.viewerCount || 0);
      }
    } catch (e) {}
  }

  function updateViewerCountUI(count) {
    const elAdmin = document.getElementById('admin-viewer-count');
    if (elAdmin) elAdmin.textContent = count;
    const elStudent = document.getElementById('student-live-viewers');
    if (elStudent) elStudent.textContent = count;
  }

  // ==========================================
  // WEBRTC SIGNALING & DIRECT AUDIO-VIDEO STREAMING
  // ==========================================
  function startTeacherSignaling() {
    if (teacherSignalPollInterval) clearInterval(teacherSignalPollInterval);
    teacherSignalPollInterval = setInterval(async () => {
      if (!isCurrentAdminLive) return;
      try {
        if (!window.StudyPulseAPI || !window.StudyPulseAPI.live) return;
        const res = await window.StudyPulseAPI.live.getSignal('teacher_inbox');
        if (res && res.success && res.messages && res.messages.length > 0) {
          for (const msg of res.messages) {
            handleTeacherSignalMessage(msg);
          }
        }
      } catch (e) {}
    }, 2500);
  }

  async function handleTeacherSignalMessage(msg) {
    const viewerId = msg.fromId;
    if (!viewerId) return;

    if (msg.type === 'join') {
      try {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        teacherPeerConnections[viewerId] = pc;

        if (activeStream) {
          activeStream.getTracks().forEach(track => {
            pc.addTrack(track, activeStream);
          });
        }

        pc.onicecandidate = (evt) => {
          if (evt.candidate) {
            window.StudyPulseAPI.live.sendSignal({
              targetId: viewerId,
              fromId: 'teacher',
              type: 'candidate',
              payload: evt.candidate
            }).catch(() => {});
          }
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await window.StudyPulseAPI.live.sendSignal({
          targetId: viewerId,
          fromId: 'teacher',
          type: 'offer',
          payload: offer
        });
      } catch (err) {
        console.warn('[LiveStudio] Error handling viewer join:', err);
      }
    } else if (msg.type === 'answer') {
      const pc = teacherPeerConnections[viewerId];
      if (pc && pc.signalingState !== 'stable') {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(msg.payload));
        } catch (e) {}
      }
    } else if (msg.type === 'candidate') {
      const pc = teacherPeerConnections[viewerId];
      if (pc) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(msg.payload));
        } catch (e) {}
      }
    }
  }

  async function startStudentWebRtc() {
    const user = getSessionUser();
    const myViewerId = user.id || ('usr_' + Math.random().toString(36).substr(2, 6));

    if (studentSignalPollInterval) clearInterval(studentSignalPollInterval);

    try {
      await window.StudyPulseAPI.live.sendSignal({
        targetId: 'teacher_inbox',
        fromId: myViewerId,
        type: 'join'
      });
    } catch (e) {}

    studentSignalPollInterval = setInterval(async () => {
      try {
        if (!window.StudyPulseAPI || !window.StudyPulseAPI.live) return;
        const res = await window.StudyPulseAPI.live.getSignal(myViewerId);
        if (res && res.success && res.messages && res.messages.length > 0) {
          for (const msg of res.messages) {
            handleStudentSignalMessage(msg, myViewerId);
          }
        }
      } catch (e) {}
    }, 2000);
  }

  async function handleStudentSignalMessage(msg, myViewerId) {
    if (msg.type === 'offer') {
      try {
        if (studentPeerConnection) {
          studentPeerConnection.close();
        }
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        studentPeerConnection = pc;

        pc.ontrack = (event) => {
          const videoEl = document.getElementById('student-live-video');
          if (videoEl && event.streams[0]) {
            videoEl.srcObject = event.streams[0];
            videoEl.play().catch(() => {});
          }
        };

        pc.onicecandidate = (evt) => {
          if (evt.candidate) {
            window.StudyPulseAPI.live.sendSignal({
              targetId: 'teacher_inbox',
              fromId: myViewerId,
              type: 'candidate',
              payload: evt.candidate
            }).catch(() => {});
          }
        };

        await pc.setRemoteDescription(new RTCSessionDescription(msg.payload));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        await window.StudyPulseAPI.live.sendSignal({
          targetId: 'teacher_inbox',
          fromId: myViewerId,
          type: 'answer',
          payload: answer
        });
      } catch (err) {
        console.warn('[LiveStudio] Error processing teacher offer:', err);
      }
    } else if (msg.type === 'candidate' && studentPeerConnection) {
      try {
        await studentPeerConnection.addIceCandidate(new RTCIceCandidate(msg.payload));
      } catch (e) {}
    }
  }

  // ==========================================
  // 2. STUDENT LIVE VIEWER CONTROLLER
  // ==========================================
  async function initStudentLive() {
    console.log('[LiveStudio] Initializing Student Live Class Viewer...');
    setupStudentCommentInput();
    await checkStudentLiveStatus();

    // Start comment polling
    startCommentPolling(false);

    // Heartbeat every 8s
    if (studentHeartbeatInterval) clearInterval(studentHeartbeatInterval);
    const user = getSessionUser();
    studentHeartbeatInterval = setInterval(async () => {
      try {
        const res = await window.StudyPulseAPI.live.heartbeat(user.id);
        if (res && res.activeViewers !== undefined) {
          updateViewerCountUI(res.activeViewers);
        }
        if (res && res.isLive !== undefined) {
          handleLiveStateChange(res.isLive);
        }
      } catch (e) {}
    }, 8000);

    // Listen to local BroadcastChannel for zero-latency testing
    if (streamBroadcastChannel) {
      streamBroadcastChannel.onmessage = (evt) => {
        if (evt.data && evt.data.type === 'LIVE_STARTED') {
          checkStudentLiveStatus();
        } else if (evt.data && evt.data.type === 'LIVE_ENDED') {
          checkStudentLiveStatus();
        }
      };
    }
  }

  function handleLiveStateChange(isLive) {
    const liveContainer = document.getElementById('student-live-active-container');
    const offlineContainer = document.getElementById('student-live-offline-container');
    const badge = document.getElementById('student-live-status-pill');

    if (isLive) {
      if (liveContainer) liveContainer.classList.remove('hidden');
      if (offlineContainer) offlineContainer.classList.add('hidden');
      if (badge) {
        badge.innerHTML = '<span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span><span class="text-rose-500 font-black">🔴 LIVE CHALU HAI</span>';
      }
    } else {
      if (liveContainer) liveContainer.classList.add('hidden');
      if (offlineContainer) offlineContainer.classList.remove('hidden');
      if (badge) {
        badge.innerHTML = '<span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span><span class="text-slate-400 font-bold">⚪ OFFLINE</span>';
      }
    }
  }

  async function checkStudentLiveStatus() {
    try {
      const res = await window.StudyPulseAPI.live.getStatus();
      if (res && res.success && res.live) {
        const live = res.live;
        handleLiveStateChange(live.isLive);

        if (live.isLive) {
          // Update details
          const titleEl = document.getElementById('student-live-title');
          if (titleEl) titleEl.textContent = live.title;
          const subjEl = document.getElementById('student-live-subject');
          if (subjEl) subjEl.textContent = live.subject;
          const teacherEl = document.getElementById('student-live-teacher');
          if (teacherEl) teacherEl.textContent = live.teacherName;
          const pinEl = document.getElementById('student-pinned-notice');
          if (pinEl && live.pinnedMessage) {
            pinEl.textContent = live.pinnedMessage;
            document.getElementById('student-pinned-container')?.classList.remove('hidden');
          }

          // Setup video feed
          setupStudentVideoPlayer(live);
        }
        updateViewerCountUI(live.viewerCount || 1);
      }
    } catch (e) {
      console.warn('[LiveStudio] Error checking live status:', e);
    }
  }

  function setupStudentVideoPlayer(live) {
    const videoEl = document.getElementById('student-live-video');
    const iframeEl = document.getElementById('student-live-iframe');

    if (live.streamType === 'stream_url' && live.streamUrl) {
      // YouTube or custom video embed
      if (videoEl) videoEl.classList.add('hidden');
      if (iframeEl) {
        iframeEl.classList.remove('hidden');
        let embedUrl = live.streamUrl;
        if (embedUrl.includes('youtube.com/watch?v=')) {
          embedUrl = embedUrl.replace('watch?v=', 'embed/') + '?autoplay=1';
        } else if (embedUrl.includes('youtu.be/')) {
          embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/') + '?autoplay=1';
        }
        iframeEl.src = embedUrl;
      }
    } else {
      // Direct Camera / Mic / Screen Share
      if (iframeEl) iframeEl.classList.add('hidden');
      if (videoEl) {
        videoEl.classList.remove('hidden');

        // Check if admin is currently active in this browser instance
        const adminVideo = document.getElementById('admin-live-video');
        if (adminVideo && adminVideo.srcObject) {
          videoEl.srcObject = adminVideo.srcObject;
          videoEl.play().catch(() => {});
        } else {
          // Render animated interactive chalkboard teacher avatar placeholder
          renderChalkboardTeacher(videoEl, live);
          // Connect real WebRTC stream from teacher
          startStudentWebRtc();
        }
      }
    }
  }

  function renderChalkboardTeacher(videoEl, live) {
    // Generate a sleek canvas animation stream representing live teacher audio-visual lecture
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');

      let step = 0;
      function draw() {
        step += 0.05;
        // Dark chalkboard gradient background
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#090D16');
        grad.addColorStop(0.5, '#0F172A');
        grad.addColorStop(1, '#090D16');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Center card
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = 'rgba(79, 70, 229, 0.4)';
        ctx.lineWidth = 2;
        ctx.roundRect(140, 80, 1000, 560, 24);
        ctx.fill();
        ctx.stroke();

        // Glowing live badge
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(200, 140, 10 + Math.sin(step * 2) * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'bold 26px system-ui, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('STUDYPULSE LIVE CLASS', 230, 148);

        // Class Title
        ctx.font = 'bold 44px system-ui, sans-serif';
        ctx.fillStyle = '#E2E8F0';
        ctx.fillText(live.title || 'Special Interactive Lecture', 200, 260);

        // Subject & Teacher
        ctx.font = '24px system-ui, sans-serif';
        ctx.fillStyle = '#818CF8';
        ctx.fillText(`📚 Subject: ${live.subject || 'All Exams'}  •  👨‍🏫 Teacher: ${live.teacherName || 'Super Admin'}`, 200, 315);

        // Interactive Audio Spectrum Wave
        ctx.strokeStyle = '#4F46E5';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let x = 200; x <= 1080; x += 15) {
          const wave = Math.sin(step * 3 + x * 0.02) * Math.cos(step + x * 0.01) * 35;
          const y = 460 + wave;
          if (x === 200) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Footer Note
        ctx.font = '18px system-ui, sans-serif';
        ctx.fillStyle = '#94A3B8';
        ctx.fillText('🔒 View-Only Mode: Aap srif dekh aur sun sakte hain. Sawal poochne ke liye live chat use karein.', 200, 580);
        ctx.restore();

        requestAnimationFrame(draw);
      }
      draw();

      const stream = canvas.captureStream(30);
      videoEl.srcObject = stream;
      videoEl.play().catch(() => {});
    } catch (e) {
      console.warn('Canvas stream capture fallback:', e);
    }
  }

  function setupStudentCommentInput() {
    const input = document.getElementById('student-live-comment-input');
    const sendBtn = document.getElementById('btn-student-send-comment');

    const handleSend = async () => {
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;
      input.value = '';

      const user = getSessionUser();
      try {
        await window.StudyPulseAPI.live.postComment({
          text,
          userName: user.name,
          userId: user.id
        });
        await loadComments(false);
      } catch (e) {
        alert('Comment bhejne me error: ' + e.message);
      }
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }

    // Quick reaction chips
    const quickButtons = document.querySelectorAll('.live-quick-reaction');
    quickButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const reactionText = btn.getAttribute('data-reaction') || btn.textContent.trim();
        if (input) {
          input.value = reactionText;
          handleSend();
        }
      });
    });
  }

  // ==========================================
  // 3. REAL-TIME COMMENTS POLLING & RENDERING
  // ==========================================
  function startCommentPolling(isAdmin = false) {
    if (commentPollInterval) clearInterval(commentPollInterval);
    loadComments(isAdmin);
    commentPollInterval = setInterval(() => {
      loadComments(isAdmin);
    }, 2000);
  }

  async function loadComments(isAdmin = false) {
    try {
      if (!window.StudyPulseAPI || !window.StudyPulseAPI.live) return;
      const res = await window.StudyPulseAPI.live.getComments();
      if (res && res.success && res.comments) {
        renderCommentsList(res.comments, isAdmin);
      }
    } catch (e) {}
  }

  function renderCommentsList(comments, isAdmin = false) {
    const listEl = isAdmin 
      ? document.getElementById('admin-live-comments-list')
      : document.getElementById('student-live-comments-list');

    if (!listEl) return;

    if (comments.length === 0) {
      listEl.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
          <i class="fa-solid fa-comments text-3xl mb-2 text-slate-500/50"></i>
          <p class="text-xs">Abhi tak koi comment nahi aaya hai.<br>Pehla sawal ya message likhein!</p>
        </div>
      `;
      return;
    }

    const html = comments.map(c => {
      const isTeacher = c.role === 'admin';
      const isSystem = c.role === 'system';

      if (isSystem) {
        return `
          <div class="px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-[11px] text-slate-300 text-center my-1">
            ${c.text}
          </div>
        `;
      }

      return `
        <div class="p-2.5 rounded-xl text-xs transition ${isTeacher 
          ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200' 
          : 'bg-slate-800/40 border border-slate-700/30 text-slate-200'}">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-1.5 font-bold">
              <span class="w-2 h-2 rounded-full ${isTeacher ? 'bg-amber-400' : 'bg-brand-400'}"></span>
              <span class="${isTeacher ? 'text-amber-400 font-black' : 'text-slate-300'}">${c.userName}</span>
              ${isTeacher ? '<span class="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-500 text-slate-900">Teacher ⭐</span>' : ''}
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] text-slate-400">${c.time || ''}</span>
              ${isAdmin ? `<button onclick="LiveStudio.deleteComment('${c._id}')" class="text-rose-400 hover:text-rose-300 text-xs cursor-pointer ml-1" title="Delete comment"><i class="fa-solid fa-trash-can"></i></button>` : ''}
            </div>
          </div>
          <div class="text-[13px] leading-relaxed break-words">${c.text}</div>
        </div>
      `;
    }).join('');

    const isScrolledToBottom = listEl.scrollHeight - listEl.clientHeight <= listEl.scrollTop + 60;
    listEl.innerHTML = html;
    if (isScrolledToBottom) {
      listEl.scrollTop = listEl.scrollHeight;
    }
  }

  async function deleteComment(commentId) {
    if (!confirm('Kya aap is comment ko delete karna chahte hain?')) return;
    try {
      await window.StudyPulseAPI.live.deleteComment(commentId);
      loadComments(true);
    } catch (e) {
      alert('Delete karne me error: ' + e.message);
    }
  }

  // ==========================================
  // 4. GLOBAL LIVE STATUS BANNER ON DASHBOARD
  // ==========================================
  function startGlobalLiveChecker() {
    if (globalLiveCheckInterval) clearInterval(globalLiveCheckInterval);
    checkGlobalLive();
    globalLiveCheckInterval = setInterval(checkGlobalLive, 10000);
  }

  async function checkGlobalLive() {
    try {
      if (!window.StudyPulseAPI || !window.StudyPulseAPI.live) return;
      const res = await window.StudyPulseAPI.live.getStatus();
      if (res && res.success && res.live) {
        const isLive = res.live.isLive;
        // Sidebar & Bottom nav live pulse dot
        const navLiveDot = document.getElementById('nav-live-dot');
        if (navLiveDot) {
          if (isLive) navLiveDot.classList.remove('hidden');
          else navLiveDot.classList.add('hidden');
        }

        // Dashboard Top Live Alert Banner
        const dashBanner = document.getElementById('dashboard-live-banner');
        if (dashBanner) {
          if (isLive) {
            dashBanner.classList.remove('hidden');
            const titleEl = document.getElementById('dashboard-live-title');
            if (titleEl) titleEl.textContent = res.live.title;
          } else {
            dashBanner.classList.add('hidden');
          }
        }
      }
    } catch (e) {}
  }

  return {
    initAdminStudio,
    initStudentLive,
    startGlobalLiveChecker,
    deleteComment
  };
})();

// Export globally
window.LiveStudio = LiveStudio;
