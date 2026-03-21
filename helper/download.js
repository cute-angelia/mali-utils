export function download(blobUrl, fileName = 'video.mp4') {
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fileName;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}