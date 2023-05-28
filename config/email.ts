import path from "path";
import { readFile } from "fs/promises";

const templatePath = path.join(__dirname, "templates");
const templateCache = new Map<string, string>();

function getTemplatePath(fileName: string) {
  return path.join(templatePath, fileName);
}

async function getTemplateContent(fileName: string) {
  if (templateCache.has(fileName)) return templateCache.get(fileName);
  const filePath = getTemplatePath(fileName);
  const content = await readFile(filePath);
  const contentString = content.toString();
  templateCache.set(fileName, contentString);
  return contentString;
}

export async function sendEmailTemplate(
  to: string,
  subject: string,
  text: string,
  templateName: string,
  variables: Record<string, any>
): Promise<void> {
  const html = await getTemplateContent(templateName);
  const emailOptions = [
    { to },
    {
      subject,
      text,
      html,
    },
    { ...variables },
  ];

  return strapi.plugins["email"].services.email.sendTemplatedEmail(
    ...emailOptions
  );
}
