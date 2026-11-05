/* PWA shell caching: public static assets only, no invoices, credentials or API responses. */
(() => {
 let installPrompt = null;
 const installBtn = document.getElementById('installAppButton');
 const markState=flag=>{document.body.dataset.canInstall=flag?'1':'0'; if(typeof renderBrowserInstallNotice==='function') renderBrowserInstallNotice(flag)};
 if (('serviceWorker' in navigator) && (location.protocol === 'https:' || location.hostname === 'localhost')) {
   window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(console.warn));
 }
 if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true){ if(installBtn) installBtn.hidden=true; markState(false); }
 else { markState(false); }
 window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt=e; if (installBtn) installBtn.hidden=false; markState(true); });
 installBtn?.addEventListener('click', async () => {
   if (!installPrompt) return;
   installPrompt.prompt(); await installPrompt.userChoice;
   installPrompt=null; if(installBtn) installBtn.hidden=true; markState(false);
 });
 window.addEventListener('appinstalled', () => {installPrompt=null;if(installBtn)installBtn.hidden=true;markState(false);});
})();
