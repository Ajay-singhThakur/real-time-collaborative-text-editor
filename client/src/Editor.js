import React, { useEffect, useState, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// Requirement: Full Toolbar (Typography, Styling, Structure, Lists, Alignment)
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, false] }],     
  [{ font: [] }, { size: [] }],     
  ['bold', 'italic', 'underline'],  
  [{ color: [] }],                  
  [{ list: 'bullet' }],             
  [{ align: [] }],                
  ['clean'],
];

export default function Editor({ socket }) {
  const [quill, setQuill] = useState();

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { 
      theme: "snow", 
      modules: { toolbar: TOOLBAR_OPTIONS } 
    });
    setQuill(q);
  }, []);

  // Sync: Send local changes to server
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);
    return () => quill.off('text-change', handler);
  }, [socket, quill]);

  // Sync: Receive remote changes from other users
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes', handler);
    return () => socket.off('receive-changes', handler);
  }, [socket, quill]);

  return <div className="editor-container" ref={wrapperRef}></div>;
}