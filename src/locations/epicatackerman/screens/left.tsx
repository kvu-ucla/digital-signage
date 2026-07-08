import type { MergedMenuData } from "@/lib/types";
import { PAGE_CONFIG } from "../config";
import HorizontalTemplate from "@/locations/epicatackerman/HorizontalTemplate";

export default function LeftScreen({ data }: { data: MergedMenuData }) {
    
    const config = PAGE_CONFIG["left"];
    if (!config) return null;

    const filteredData = data; // 
    
    return (
        <HorizontalTemplate data={filteredData} />
    );
}
