import fs from 'fs';
import path from 'path';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  const dataFilePath = path.join(
    process.cwd(),
    "src/content/fossilSortingData/fossilSortingData.json"
  );
  const jsonData = fs.readFileSync(dataFilePath, "utf-8");
  const prettyJsonData = JSON.stringify(JSON.parse(jsonData), null, 2);
  return new Response(prettyJsonData, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="fossilSortingData.json"'
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
