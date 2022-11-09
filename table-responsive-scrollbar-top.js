/** add .table-responsive-scrollbar-top functionality
 *  for usage with bootstrap's responsive-table.
 *  just add an additional <div class="responsive-table table-responsive-scrollbar-top"></div> as previous sibling to <div class="responsive-table">...</div>
 */
window.addEventListener('DOMContentLoaded', function() {
    let mains = document.querySelectorAll('.table-responsive');
    if (mains.length > 0) {
        Array.from(mains).forEach(function(main) {
            let top = main.previousElementSibling.matches('.table-responsive-scrollbar-top') ? main.previousElementSibling : null;
            if (top) {
                let timeout = false;
                let toggleScrollbar;

                top.style.display = 'none';
                
                if (!top.firstElementChild) {
                    top.appendChild(document.createElement("div"));
                }

                (toggleScrollbar = function() {
                    
                    if (main.offsetWidth < main.scrollWidth) {
                        top.style.display = 'block';
                        top.style.height = (main.offsetHeight - main.clientHeight) + 'px';
                        top.firstElementChild.style.width = main.scrollWidth + 'px';
                    } else {
                        top.style.display = 'revert';
                    }
                })();

                addEventListener('resize', (event) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(toggleScrollbar, 100);
                });

                top.addEventListener('scroll', function(e) {
                    main.scrollLeft = top.scrollLeft;
                });
                main.addEventListener('scroll', function(e) {
                    top.scrollLeft = main.scrollLeft;
                });
            }
        });
    }
});
