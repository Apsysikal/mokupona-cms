import { faker } from "@faker-js/faker";
import axios from "axios";
import { Readable } from "stream";
import crypto from "crypto";
import fs from "fs/promises";
import os from "os";
import path from "path";

const createAndAssignTmpWorkingDirectoryToFiles = () =>
  fs.mkdtemp(path.join(os.tmpdir(), "strapi-upload-"));

async function fetchFile(url: string) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return {
    data: response.data,
    type: response.headers["content-type"],
    size: response.headers["content-length"],
  };
}

export async function createImage(strapi: Strapi.Strapi) {
  const config = strapi.config.get("plugin.upload");
  const url = faker.image.urlLoremFlickr({ category: "food" });
  const image = await fetchFile(url);

  const name = faker.word.noun();
  const hash = crypto.createHash("sha256").update(image.data);

  const entity = {
    name,
    hash: `${name}_${hash.digest("base64url")}`,
    ext: ".jpg",
    mime: image.type,
    size: Math.floor(Number(image.size) / 1000),
    provider: config.provider,
    tmpWorkingDirectory: await createAndAssignTmpWorkingDirectoryToFiles(),
    getStream: () => Readable.from(image.data),
  };

  await strapi.plugin("upload").service("upload").uploadImage(entity);
  return strapi.query("plugin::upload.file").create({ data: entity });
}

// const url = faker.image.urlLoremFlickr({ category: "food" });
