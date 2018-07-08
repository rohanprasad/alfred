const filterGithubActivityFeed = () => {
  if (window.location.pathname === "/") {
    const keywordList = ["practo", "Recent activity"];

    const itemsToKeep = content => {
      const found = keywordList.every(keyword => {
        if (content.innerText.indexOf(keyword) !== -1) {
          return false;
        }
        return true;
      });
      return !found;
    };

    const getItemsForRemoval = newsFeed => {
      let list = Array.from(newsFeed.children);
      return list.filter(itemsToKeep);
    };

    const mutationObserver = new MutationObserver(mutationList => {
      mutationList.forEach(item => {
        if (item.type === "childList" && item.addedNodes.length > 0) {
          mutationObserver.disconnect();
          const removalList = getItemsForRemoval(newsFeed);
          removalList.forEach(item => {
            if (newsFeed.contains(item)) {
              newsFeed.removeChild(item);
            }
          });
          mutationObserver.observe(newsFeed, options);
        }
      });
    });

    const newsFeed = document.querySelector(
      "#dashboard > div.news.column.two-thirds"
    );

    const options = {
      childList: true
    };

    mutationObserver.observe(newsFeed, options);
  }
};

const clearContainerPadding = () => {
  if (window.location.pathname === "/") {
    const container = document.querySelector(".container");
    container.style.width = "100%";
    container.style.padding = "0 40px";
  }
};

const redesignFeedToGrid = () => {
  if (window.location.pathname === "/") {
    var sheet = document.createElement("style");
    sheet.innerHTML = `
    .dashboard-sidebar.one-third {
      width: 300px;
    }
    .news.two-thirds {
      width: calc(100% - 300px);
    }
    .news {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 50px;
      grid-row-gap: 28px;
    }
    div.UnderlineNav,
    .js-all-activity-header {
      grid-column: 1/3;
    }
    .body {
      height: 100%;
    }
    .body > div {
      height: 100%;
    }
  `;
    document.body.appendChild(sheet);
  }
};

filterGithubActivityFeed();
clearContainerPadding();
redesignFeedToGrid();
