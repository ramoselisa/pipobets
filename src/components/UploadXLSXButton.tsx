
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

export function UploadXLSXButton() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would process the XLSX file here
      // For example, using a library like xlsx or exceljs
      console.log("File selected:", file.name);
      
      // Display a simple alert for now
      alert(`File "${file.name}" selected! In a complete implementation, this would parse the XLSX data.`);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        aria-label="Upload XLSX file"
      />
      <Button variant="outline" className="w-full flex items-center gap-2 border-dashed border-primary/50">
        <FileSpreadsheet className="h-4 w-4" />
        <span>Upload Predictions XLSX</span>
      </Button>
    </div>
  );
}
