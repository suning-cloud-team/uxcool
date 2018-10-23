import { isFunction } from '@suning/v-utils';
import { BlobSlice, getChunkUploadBytes } from '../utils';

export default function chunkRequest(request, reqs) {
  const nReqs = reqs;
  return (options) => {
    const {
      maxChunkSize,
      uploadedBytes,
      onChunkSend,
      onChunkSuccess,
      onChunkError,
      ...reqOpts
    } = options;

    const {
      fileName, file, data, onProgress, onSuccess, onError
    } = reqOpts;

    const { uid } = file;
    const ubytesRet = isFunction(uploadedBytes) ? uploadedBytes(file, data) : uploadedBytes;
    Promise.resolve(ubytesRet).then((ubytes) => {
      let idx = 0;
      let ub = Number(ubytes) || 0;
      const maxSize = Number(maxChunkSize);
      const fileSize = file.size;
      if (ub || maxSize < fileSize) {
        if (ub >= fileSize) {
          onError(new Error('uplodedbytes > file.size'), null);
          return;
        }

        const chunkUploadFn = () => {
          idx += 1;
          const chunkId = `chunk-${uid}-${idx}`;
          const chunkName = `${fileName}-chunk-${idx}`;
          const chunk = BlobSlice.call(file, ub, ub + maxSize, file.type);
          const chunkSize = chunk.size;
          const nFile = new File([chunk], chunkName, { type: file.type });
          const startOffset = ub;
          // eslint-disable-next-line
          const endOffset = ub + chunkSize - 1;
          const range = `bytes ${startOffset}-${endOffset}/${fileSize}`;
          const disposition = `attachment; filename="${encodeURI(file.name)}"`;
          const headers = {
            ...options.headers,
            'Content-Range': range,
            'Content-Disposition': disposition,
          };

          const formData = {
            ...data,
            chunkData: JSON.stringify({
              uuid: `chunk-upload-${uid}`,
              size: fileSize,
              chunkIdx: idx,
              start: startOffset,
              end: endOffset,
              isLastChunk: endOffset === fileSize,
            }),
          };
          const chunkEventData = {
            file,
            chunk,
            chunkSize,
            chunkIdx: idx,
            startOffset,
            endOffset,
            contentRange: range,
            data,
          };
          onChunkSend(chunkEventData);
          nReqs[chunkId] = request({
            ...reqOpts,
            file: nFile,
            headers,
            data: formData,
            onProgress(e) {
              if (fileSize > 0) {
                // eslint-disable-next-line
                e.percent = ub / fileSize * 100;
              }

              onProgress(e);
            },
            onSuccess(ret, xhr) {
              ub = getChunkUploadBytes(xhr) || ub + chunkSize;
              onChunkSuccess(ret, { ...chunkEventData, xhr });
              if (ub < fileSize) {
                chunkUploadFn();
              } else {
                onSuccess(ret, file, xhr);
              }
            },
            onError(err, ret) {
              onChunkError(err, ret, { ...chunkEventData });
              onError(err, ret);
            },
          });
        };
        chunkUploadFn();
      } else {
        nReqs[uid] = request(reqOpts);
      }
    });
  };
}
