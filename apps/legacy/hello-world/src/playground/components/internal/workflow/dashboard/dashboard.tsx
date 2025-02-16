import { memo, useCallback, useEffect, useState } from "react";

import { ImmutablePlaygroundAttributes } from "@/playground/components/common";

import {Display} from "./display";
import {PropsEditor} from "./propsEditor";

type Props = {
    node: ImmutablePlaygroundAttributes | null;
};

const Dashboard = ({node}: Props) => {
    const [modifiedNode, setModifiedNode] = useState<ImmutablePlaygroundAttributes | null>(null);
    const handleReset = useCallback(() => {
        setModifiedNode(node);
    }, [node]);
    useEffect(() => {
        setModifiedNode(node);
    }, [node]);
    return (
        <main className="grid col-span-3 border border-amber-400">
            <div className="grid grid-cols-4">
                <div className="col-span-2 p-5 content-center max-h-[44rem] overflow-y-auto border border-red-500">
                    <Display node={modifiedNode} />
                </div>
                <div className="col-span-2 flex flex-col border border-green-500">
                    <PropsEditor node={modifiedNode} onNodeChange={setModifiedNode} onReset={handleReset} />
                </div>
            </div>
        </main>
    );
};

export default memo(Dashboard);
