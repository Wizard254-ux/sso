import { useEffect } from "react";

function useExpandCollapse() {
  useEffect(() => {
    const handleCollapseClick = (e) => {
      if (e.target.classList.contains("collapse-div")) {
        
        // Find the closest collapsible-div within the same parent container
        const container = e.target.closest(".collapsible-main");
        if (container) {
          const collapsibleDiv = container.nextElementSibling;
          if (collapsibleDiv && collapsibleDiv.classList.contains("collapsible-div")) {
            collapsibleDiv.style.display =
              collapsibleDiv.style.display === "none" ? "block" : "none";
          }
        }
      }
    };

    document.addEventListener("click", handleCollapseClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleCollapseClick);
    };
  }, []);
}

export default useExpandCollapse;
