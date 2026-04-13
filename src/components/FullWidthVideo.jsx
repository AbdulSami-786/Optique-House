// FullWidthVideo.jsx
const FullWidthVideo = ({ src, title, aspectRatio = "16/9" }) => {
  return (
    <div className="relative w-full bg-black">
      <div 
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: aspectRatio }}
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {title && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h3 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg text-center px-4">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default FullWidthVideo;