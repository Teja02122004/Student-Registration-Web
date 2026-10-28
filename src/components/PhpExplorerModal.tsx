/**
 * PHP Source Explorer & Project ZIP Exporter
 * Allows examiners & students to inspect every PHP file, copy source code,
 * and download the entire ready-to-deploy PHP project ZIP.
 */

import React, { useState } from 'react';
import { PHP_FILES_STORE } from '../utils/phpFilesStore.ts';
import { downloadPhpProjectZip } from '../utils/zipExporter.ts';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Folder, 
  Terminal, 
  Server, 
  Database,
  ExternalLink
} from 'lucide-react';

interface PhpExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhpExplorerModal: React.FC<PhpExplorerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const fileKeys = Object.keys(PHP_FILES_STORE);
  const [selectedFile, setSelectedFile] = useState<string>('index.php');
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const fileContent = PHP_FILES_STORE[selectedFile] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      await downloadPhpProjectZip();
    } catch (err) {
      console.error('ZIP export error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 text-slate-100">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Outfit']">
                PHP 8+ &amp; XML Source Code Inspector
              </h3>
              <p className="text-xs text-slate-400">
                Generated files located in <code>/student-management-system/</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Packaging...' : 'Download Project ZIP'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Runtime Environment Explanation Banner */}
        <div className="bg-blue-950/60 border-b border-blue-900/60 px-6 py-2.5 text-xs text-blue-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Hosting Architecture:</strong> In production or local XAMPP/WAMP, Apache serves the PHP controllers and SimpleXML handles the XML parsing with PDO prepared statements.
            </span>
          </div>
          <span className="text-[11px] font-mono text-sky-300">Target: PHP 8.0+ / MySQL 8.0 / Apache</span>
        </div>

        {/* Main Content Area (Split Sidebar & Code View) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* File Explorer Sidebar */}
          <div className="w-64 border-r border-slate-800 bg-slate-950/70 p-3 overflow-y-auto space-y-1 shrink-0 text-xs font-mono">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-amber-400" />
              <span>Project Files</span>
            </div>

            {fileKeys.map((key) => {
              const isSelected = selectedFile === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFile(key)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  <span className="truncate">{key}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-900">
            {/* Code Bar */}
            <div className="px-4 py-2 border-b border-slate-800 bg-slate-900 flex items-center justify-between text-xs shrink-0">
              <span className="font-mono text-slate-300 flex items-center gap-1.5">
                <span className="text-slate-500">student-management-system /</span>
                <strong className="text-sky-400">{selectedFile}</strong>
              </span>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy File</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Display */}
            <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
              <pre className="whitespace-pre">{fileContent}</pre>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 text-xs text-slate-400 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>To run locally: <code>cd student-management-system &amp;&amp; php -S localhost:8000</code></span>
          </div>
          <span>UTF-8 · PHP 8.2 compatible</span>
        </div>

      </div>
    </div>
  );
};
