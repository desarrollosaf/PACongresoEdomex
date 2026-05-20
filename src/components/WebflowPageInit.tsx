'use client';
import { useEffect } from 'react';

export default function WebflowPageInit({ pageId }: { pageId: string }) {
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-wf-page');
    document.documentElement.setAttribute('data-wf-page', pageId);

    const reinit = () => {
      const w = window as any;
      if (!w.Webflow) return;
      try { w.Webflow.destroy(); } catch {}
      try { w.Webflow.ready(); } catch {}
      try { w.Webflow.require('ix2')?.init?.(); } catch {}
    };

    reinit();

    return () => {
      if (prev) document.documentElement.setAttribute('data-wf-page', prev);
    };
  }, [pageId]);

  return null;
}
