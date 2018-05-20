export const isVideo = (extname: string) =>
  /^(\.mp4|\.avi)$/i.test(extname)

export const isImg = (extname: string) =>
  /^(\.jpg|\.jpeg|\.png)$/i
