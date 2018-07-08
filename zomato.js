const fixMapMinHeight = () => {
  const addAttributeChangeListener = () => {
    const mapContainer = document.getElementsByClassName("dm-map-contianer");
    if (mapContainer && mapContainer[0]) {
      const mutationObserver = new MutationObserver(mutationList => {
        mutationList.forEach(item => {
          const elem = document.getElementById("dm-map-canvas");
          if (
            item.type === "attributes" &&
            item.attributeName === "style" &&
            item.target.style.display === "block" &&
            elem &&
            elem.style.minHeight !== "480px"
          ) {
            elem.style.minHeight = "480px";
          }
        });
      });
      const options = {
        attributes: true
      };
      mutationObserver.observe(mapContainer[0], options);
    }
  };
  addAttributeChangeListener();
};

fixMapMinHeight();
