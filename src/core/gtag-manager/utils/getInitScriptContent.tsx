const initScript = (ID: string) => `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${ID}');
`;
const noScript = (ID: string) => `
<iframe
    src="https://www.googletagmanager.com/ns.html?id=${ID}" height="0" width="0"
    style="display:none;visibility:hidden">
</iframe>
        `;

export const getInitScriptContent = (ID: string): { initScript: string; noScript: string } => {
  return {
    initScript: initScript(ID),
    noScript: noScript(ID),
  };
};
export default getInitScriptContent;
