
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [showEmbedInfo, setShowEmbedInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const appUrl = 'https://6a475342-708d-4f5e-a5aa-4bea5f7698b1.lovableproject.com';
  const iframeCode = `<iframe src="${appUrl}" width="100%" height="100%" style="border: none; min-height: 600px;" title="Flow Bridge Manager"></iframe>`;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error('Failed to copy');
      });
  };
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto py-6 px-8">
          {children}
          
          {window.location.pathname === '/' && (
            <div className="mt-10 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setShowEmbedInfo(!showEmbedInfo)}
                className="mb-4"
              >
                {showEmbedInfo ? 'Hide' : 'Show'} Embed Information
              </Button>
              
              {showEmbedInfo && (
                <div className="space-y-6 bg-muted/40 rounded-lg p-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Direct URL</h3>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted p-2 rounded flex-1 overflow-x-auto">
                        {appUrl}
                      </code>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => copyToClipboard(appUrl)}
                      >
                        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">iFrame Embed Code</h3>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted p-2 rounded flex-1 overflow-x-auto">
                        {iframeCode}
                      </code>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => copyToClipboard(iframeCode)}
                      >
                        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
