import { useEffect } from "react";

function useSetTitle(title) {
    useEffect(() => {
        document.title = title;
    })
}

export {
    useSetTitle
}