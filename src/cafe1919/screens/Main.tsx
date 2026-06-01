import type { MergedMenuData } from "../../lib/types";
import { Cafe1919Template } from "../../templates/cafe1919/Cafe1919MainTemplate";

type Cafe1919ScreenProps = {
  data: MergedMenuData;
};

export const MainScreen = ({ data }: Cafe1919ScreenProps) => {
    console.log("Rendering Cafe1919 Main Screen with data:", data);
    return (
        <Cafe1919Template 
            data={data}
        />
    );
};