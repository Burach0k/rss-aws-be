const openapi = require('openapi-comment-parser');
const fs = require('fs');
const spec = openapi({ include: ['**', '../src/**'] });

fs.writeFileSync('./swagger/openApi.json', JSON.stringify(spec));
