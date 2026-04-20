import React, { useState } from 'react';

interface VideoUploadProps {
  onFileUpload: (file: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // 检查文件类型
    if (!file.type.startsWith('video/')) {
      setFileError('请上传视频文件');
      return;
    }

    // 检查文件大小（限制100MB）
    if (file.size > 100 * 1024 * 1024) {
      setFileError('视频文件不能超过100MB');
      return;
    }

    setFileError('');
    onFileUpload(file);
  };

  return (
    <div className="video-upload">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileInput}
        className="file-input"
        id="video-file"
      />
      <label
        htmlFor="video-file"
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">📹</div>
        <h4>点击或拖拽视频文件到此处</h4>
        <p>支持 MP4、MOV、AVI 等格式，最大100MB</p>
        {fileError && <p className="error-message">{fileError}</p>}
      </label>
    </div>
  );
};

export default VideoUpload;