import { getMetadataFromLocalFile } from './getMetadataFromLocalFile';

export async function GET() {
  const result = getMetadataFromLocalFile();
  return Response.json(result);
}