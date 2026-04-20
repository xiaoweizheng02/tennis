// 视频处理工具

// 压缩视频
export const compressVideo = async (videoFile: File, options: {
  maxWidth?: number;
  maxHeight?: number;
  maxBitrate?: number;
} = {}): Promise<Blob> => {
  const { maxWidth = 1280, maxHeight = 720, maxBitrate = 1000000 } = options;

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);

    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('无法创建画布'));
        return;
      }

      // 计算压缩后的尺寸
      let { videoWidth: width, videoHeight: height } = video;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // 绘制视频帧
      ctx.drawImage(video, 0, 0, width, height);

      // 转换为Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('压缩失败'));
          }
        },
        'video/mp4',
        0.8
      );
    };

    video.onerror = () => {
      reject(new Error('视频加载失败'));
    };
  });
};

// 裁剪视频
export const cropVideo = async (videoFile: File, options: {
  startTime: number;
  duration: number;
}): Promise<Blob> => {
  const { startTime, duration } = options;

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);

    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('无法创建画布'));
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 设置视频开始时间
      video.currentTime = startTime;

      const chunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(video.captureStream());

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        resolve(blob);
      };

      mediaRecorder.start();

      // 录制指定时长后停止
      setTimeout(() => {
        mediaRecorder.stop();
      }, duration * 1000);
    };

    video.onerror = () => {
      reject(new Error('视频加载失败'));
    };
  });
};

// 获取视频缩略图
export const getVideoThumbnail = async (videoFile: File, time: number = 0): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);

    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('无法创建画布'));
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 设置视频时间
      video.currentTime = time;

      video.onseeked = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/jpeg');
        resolve(thumbnail);
      };
    };

    video.onerror = () => {
      reject(new Error('视频加载失败'));
    };
  });
};

// 验证视频文件
export const validateVideoFile = (file: File): { valid: boolean; error?: string } => {
  // 检查文件类型
  if (!file.type.startsWith('video/')) {
    return { valid: false, error: '请上传视频文件' };
  }

  // 检查文件大小（限制100MB）
  if (file.size > 100 * 1024 * 1024) {
    return { valid: false, error: '视频文件不能超过100MB' };
  }

  // 检查文件扩展名
  const validExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
  const fileName = file.name.toLowerCase();
  const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

  if (!hasValidExtension) {
    return { valid: false, error: '不支持的视频格式' };
  }

  return { valid: true };
};