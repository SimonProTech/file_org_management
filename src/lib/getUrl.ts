import { Id } from '../../convex/_generated/dataModel';

function getFileUrl(fileId: Id<'_storage'>): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}

export default getFileUrl;
