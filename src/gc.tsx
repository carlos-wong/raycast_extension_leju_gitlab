import { render,ActionPanel, CopyToClipboardAction,List,getPreferenceValues } from "@raycast/api";
import { useEffect, useState } from "react";
import { IssueList, IssueScope, IssueState } from "./components/issues";

interface Preferences {
    instance?: string;
    token?: string;
}


function Command() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
        const preferences: Preferences = getPreferenceValues();

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

render(<IssueList scope={IssueScope.created_by_me} state={IssueState.all} />);
