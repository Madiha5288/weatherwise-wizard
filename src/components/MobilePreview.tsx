
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Smartphone, Tablet, X, Monitor, RotateCcw } from 'lucide-react';

interface MobilePreviewProps {
  children: React.ReactNode;
}

interface DevicePreset {
  width: number;
  height: number;
  name: string;
  isTablet: boolean;
}

const DEVICE_PRESETS: Record<string, DevicePreset> = {
  "iphone-13": { width: 390, height: 844, name: "iPhone 13", isTablet: false },
  "iphone-se": { width: 375, height: 667, name: "iPhone SE", isTablet: false },
  "pixel-5": { width: 393, height: 851, name: "Pixel 5", isTablet: false },
  "samsung-s21": { width: 360, height: 800, name: "Samsung S21", isTablet: false },
  "samsung-fold": { width: 280, height: 653, name: "Samsung Fold", isTablet: false },
  "ipad-air": { width: 820, height: 1180, name: "iPad Air", isTablet: true },
  "ipad-mini": { width: 768, height: 1024, name: "iPad Mini", isTablet: true },
  "ipad-pro": { width: 1024, height: 1366, name: "iPad Pro", isTablet: true },
  "surface-pro": { width: 912, height: 1368, name: "Surface Pro", isTablet: true },
};

const MobilePreview: React.FC<MobilePreviewProps> = ({ children }) => {
  const [selectedDevice, setSelectedDevice] = useState<string>("iphone-13");
  const device = DEVICE_PRESETS[selectedDevice as keyof typeof DEVICE_PRESETS];
  const [isOpen, setIsOpen] = useState(false);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  
  const handleDeviceChange = (value: string) => {
    setSelectedDevice(value);
  };

  const toggleOrientation = () => {
    setOrientation(prev => prev === "portrait" ? "landscape" : "portrait");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Smartphone className="h-4 w-4" />
          <span className="hidden sm:inline">Mobile Preview</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-full h-[100vh] p-0 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Device Preview</h2>
          <div className="flex items-center gap-2">
            <Select value={selectedDevice} onValueChange={handleDeviceChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DEVICE_PRESETS).map(([key, device]) => (
                  <SelectItem key={key} value={key}>
                    {device.isTablet ? <Tablet className="mr-2 h-4 w-4 inline" /> : <Smartphone className="mr-2 h-4 w-4 inline" />}
                    {device.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={toggleOrientation}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
          <div 
            className="border-8 border-black rounded-[2rem] overflow-hidden bg-white shadow-xl transition-all duration-300 flex flex-col"
            style={{ 
              width: orientation === "portrait" ? `${device.width / 2}px` : `${device.height / 2}px`, 
              height: orientation === "portrait" ? `${device.height / 2}px` : `${device.width / 2}px`,
              maxHeight: 'calc(100vh - 8rem)',
              maxWidth: 'calc(100vw - 8rem)'
            }}
          >
            <div className="bg-black h-6 flex justify-center items-center">
              <div className="w-16 h-4 rounded-b-xl bg-black"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe 
                src="/"
                className="w-full h-full border-0 capacitor" 
                style={{
                  transform: `scale(${1/2})`,
                  transformOrigin: '0 0',
                  width: orientation === "portrait" ? `${device.width}px` : `${device.height}px`, 
                  height: orientation === "portrait" ? `${device.height}px` : `${device.width}px`,
                }}
              />
            </div>
            <div className="bg-black h-1"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobilePreview;
