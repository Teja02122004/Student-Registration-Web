/**
 * Project Zip Exporter using JSZip
 * Bundles the PHP, XML, SQL, CSS, and JS files for instant deployment into XAMPP/WAMP
 */

import JSZip from 'jszip';
import { PHP_FILES_STORE } from './phpFilesStore.ts';

export async function downloadPhpProjectZip(): Promise<void> {
  const zip = new JSZip();
  const root = zip.folder('student-management-system');
  if (!root) return;

  // Populate files
  for (const [path, content] of Object.entries(PHP_FILES_STORE)) {
    root.file(path, content);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'student-management-system-php.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
