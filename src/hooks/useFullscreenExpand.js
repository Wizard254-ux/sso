import { useEffect } from "react";

function useFullscreenExpand() {
  useEffect(() => {
    const handleExpandClick = (e) => {
      // Check if the clicked element has the class 'expand-button'
      if (e.target.classList.contains("expand-button")) {
        // Find the closest div or element you want to expand
        const container = e.target.closest(".expandable-div");
        if (container) {
          // Toggle fullscreen styles
          if (!container.classList.contains("fullscreen")) {
            container.classList.add("fullscreen");
            container.style.position = "fixed";
            container.style.top = "90px";
            container.style.left = "76px";
            container.style.width = "91vw";
            container.style.height = "86vh";
            container.style.zIndex = 10;
            container.style.backgroundColor = "background.view";
            
             // Optional background
          } 
        
          else {
            container.classList.remove("fullscreen");
            container.style.position = "";
            container.style.top = "";
            container.style.left = "";
            container.style.width = "";
            container.style.height = "";
            container.style.zIndex = "";
            container.style.backgroundColor = ""; 
          }
        }
      }
    };

    document.addEventListener("click", handleExpandClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleExpandClick);
    };
  }, []);
}

export default useFullscreenExpand;