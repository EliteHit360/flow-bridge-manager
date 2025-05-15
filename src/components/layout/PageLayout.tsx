
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [showEmbedInfo, setShowEmbedInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  
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
  
  const navigationItems = [
    { label: "Dashboard", path: "/" },
    { label: "KPI Metrics", path: "/metrics" },
    { label: "Rules Config", path: "/rules" },
    { label: "Receiving", path: "/receiving" },
    { label: "Allocation", path: "/allocation" },
    { label: "Shipments", path: "/shipments" },
    { label: "Exceptions", path: "/exceptions" },
    { label: "Data", path: "/data" },
    { label: "Raw Data", path: "/raw-data" },
    { label: "Reports", path: "/reports" },
  ];

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/9e374f71-681f-401d-900b-13eafe7ebb50.png" 
                alt="Algo Logo" 
                className="h-8 mr-4" 
              />
              <h1 className="text-lg font-semibold text-primary">Flow Bridge Manager</h1>
            </div>
          </div>
          
          <Tabs defaultValue={currentPath} className="w-full pb-2">
            <TabsList className="w-full justify-start overflow-x-auto">
              {navigationItems.map((item) => (
                <TabsTrigger 
                  key={item.path} 
                  value={item.path} 
                  asChild
                  className="px-4"
                >
                  <Link to={item.path}>{item.label}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto py-6 px-8 container mx-auto">
        {children}
        
        {currentPath === '/' && (
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
  );
};

export default PageLayout;
