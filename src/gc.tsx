import { ActionPanel, CopyToClipboardAction,List,getPreferenceValues } from "@raycast/api";
import { useEffect, useState } from "react";

interface Preferences {
    instance?: string;
    toke?: string;
}


export default function Command() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
        const preferences: Preferences = getPreferenceValues();
        console.log("carlos dump preferences");
        console.log(preferences);
        preferences.name = "carlos";

    }, []);

    return <List isLoading={isLoading}>{
        <List>
            <List.Item
                title="Item 1"
                actions={
                    <ActionPanel>
                        <CopyToClipboardAction content="👋" />
                    </ActionPanel>
                }
            />
        </List>
    }</List>;
}
