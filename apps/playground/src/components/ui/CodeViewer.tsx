import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeViewerProps {
  /**
   * The code string to display.
   */
  code: string;
  /**
   * Optional title for the code block header.
   */
  title?: string;
  /**
   * The language to use for syntax highlighting.
   * @default 'tsx'
   */
  language?: 'tsx' | 'jsx' | 'typescript' | 'javascript' | 'css' | 'json';
}

/**
 * A component to display formatted and highlighted code blocks with a copy button.
 */
const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  title = 'Code Example',
  language = 'tsx',
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    // Trim leading/trailing whitespace before copying
    navigator.clipboard.writeText(code.trim()).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500); // Reset after 2.5 seconds
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      },
    );
  };

  return (
    <div className="bg-[#011627] rounded-xl shadow-lg overflow-hidden my-6">
      {/* --- Header --- */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800/50">
        <span className="text-gray-400 font-mono text-sm select-none">
          {title}
        </span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            isCopied
              ? 'bg-green-600/80 text-white'
              : 'bg-gray-700/80 text-gray-300 hover:bg-gray-600/80'
          }`}
          aria-label="Copy code to clipboard"
        >
          {isCopied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* --- Code Area --- */}
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 overflow-x-auto text-sm leading-relaxed`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="flex">
                {/* Line numbers */}
                <span className="inline-block w-8 text-right text-gray-500/80 select-none mr-4">
                  {i + 1}
                </span>
                {/* Line content */}
                <span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeViewer;
