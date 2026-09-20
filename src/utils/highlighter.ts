export function highlightCode(code: string): string {
  if (!code) return "";
  
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const comments: string[] = [];
  escaped = escaped.replace(/(\/\/.*)/g, (match) => { comments.push(match); return `__C${comments.length - 1}__`; });

  const strings: string[] = [];
  escaped = escaped.replace(/(["'`])(.*?)\1/g, (match) => { strings.push(match); return `__S${strings.length - 1}__`; });

  const keywords = [
    "import","from","const","let","var","async","await","function","class","export","default",
    "new","return","describe","test","it","expect","as","true","false","null","undefined","try","catch"
  ];
  escaped = escaped.replace(new RegExp(`\\b(${keywords.join("|")})\\b`, "g"), '<span class="text-[#2B4E6F] font-semibold">$1</span>');

  const methods = [
    "page","cy","goto","visit","click","fill","type","press","selectOption",
    "getByRole","getByText","getByLabel","getByPlaceholder","getByTestId","getByTitle","getByAltText",
    "toBeVisible","toHaveURL","toBeEnabled","toBeDisabled","toContainText","toHaveText",
    "get","contains","should","intercept","wait","request","route"
  ];
  escaped = escaped.replace(new RegExp(`\\b(${methods.join("|")})\\b`, "g"), '<span class="text-[#B45309] font-medium">$1</span>');

  escaped = escaped.replace(/\b(\d+)\b/g, '<span class="text-[#4B5563]">$1</span>');

  escaped = escaped.replace(/__S(\d+)__/g, (_, i) => `<span class="text-[#047857]">${strings[parseInt(i, 10)]}</span>`);
  escaped = escaped.replace(/__C(\d+)__/g, (_, i) => `<span class="text-[#9CA3AF] italic font-normal">${comments[parseInt(i, 10)]}</span>`);

  return escaped;
}