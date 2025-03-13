
import React from 'react';
import { Settings, Save, PlusCircle, Info, HelpCircle } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

const Rules = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username="Jasas Ataullah" />
        
        <main className="flex-1 overflow-y-auto bg-secondary/50 p-6">
          <PageTitle 
            title="Flow-Through Rules Configuration" 
            subtitle="Configure business rules for automated allocation decisions"
          />
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="bg-primary/5 border-b p-4 flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Allocation Rules</h3>
              </div>
              
              <div className="p-6">
                <div className="mb-6 p-4 border border-dashed rounded-lg bg-accent/50">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm">These rules define when items should be cross-docked vs. put away to storage. Changes will affect future shipments only.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted/50 p-4 flex items-center justify-between">
                      <h4 className="font-medium">Lead Time Rule</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">Active</span>
                        <button className="text-muted-foreground hover:text-foreground">
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        If store demand is due within <span className="font-medium text-foreground">X</span> days, allocate for flow-through.
                      </p>
                      
                      <div>
                        <label htmlFor="days-threshold" className="block text-sm font-medium mb-1">
                          Days Threshold
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            id="days-threshold"
                            className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            defaultValue={7}
                            min={1}
                            max={30}
                          />
                          <span className="ml-2 text-sm text-muted-foreground">days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted/50 p-4 flex items-center justify-between">
                      <h4 className="font-medium">Inventory Level Rule</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">Active</span>
                        <button className="text-muted-foreground hover:text-foreground">
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        If store inventory level is below <span className="font-medium text-foreground">X</span>% of target, allocate for flow-through.
                      </p>
                      
                      <div>
                        <label htmlFor="inventory-threshold" className="block text-sm font-medium mb-1">
                          Inventory Threshold
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            id="inventory-threshold"
                            className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            defaultValue={60}
                            min={0}
                            max={100}
                          />
                          <span className="ml-2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-dashed overflow-hidden">
                    <div className="bg-muted/30 p-4 flex items-center justify-between">
                      <h4 className="font-medium text-muted-foreground">Add New Rule</h4>
                      <button className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1">
                        <PlusCircle className="h-4 w-4" />
                        <span className="text-sm">Add Rule</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="bg-primary/5 border-b p-4 flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Exception Handling</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted/50 p-4">
                      <h4 className="font-medium">Unallocated Items</h4>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        When items cannot be allocated for flow-through, do the following:
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="radio" id="auto-storage" name="unallocated" className="h-4 w-4 text-primary" defaultChecked />
                          <label htmlFor="auto-storage" className="ml-2 text-sm">
                            Automatically send to storage
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="radio" id="require-approval" name="unallocated" className="h-4 w-4 text-primary" />
                          <label htmlFor="require-approval" className="ml-2 text-sm">
                            Require manager approval
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="radio" id="prioritize-next" name="unallocated" className="h-4 w-4 text-primary" />
                          <label htmlFor="prioritize-next" className="ml-2 text-sm">
                            Prioritize for next available store demand
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted/50 p-4">
                      <h4 className="font-medium">Alert Thresholds</h4>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <label htmlFor="flow-threshold" className="block text-sm font-medium mb-1">
                          Flow-Through Alert Threshold
                        </label>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-2">Alert if flow-through rate drops below</span>
                          <input
                            type="number"
                            id="flow-threshold"
                            className="w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            defaultValue={60}
                            min={0}
                            max={100}
                          />
                          <span className="ml-2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="dwell-threshold" className="block text-sm font-medium mb-1">
                          Dwell Time Alert Threshold
                        </label>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-2">Alert if dwell time exceeds</span>
                          <input
                            type="number"
                            id="dwell-threshold"
                            className="w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            defaultValue={120}
                            min={0}
                          />
                          <span className="ml-2 text-sm text-muted-foreground">minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rules;
