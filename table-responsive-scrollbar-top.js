/** add .table-responsive-scrollbar-top functionality
 *  for usage with bootstrap's table-responsive.
 *  just add an additional <div class="table-responsive table-responsive-scrollbar-top"></div> as previous sibling to <div class="table-responsive">...</div>
 */
window.addEventListener('DOMContentLoaded', function() {
    let mains = document.querySelectorAll('.table-responsive:not(.table-responsive-scrollbar-top)');
    if (mains.length > 0) {
        Array.from(mains).forEach(function(main) {
            let top = main.previousElementSibling && main.previousElementSibling.matches('.table-responsive-scrollbar-top') ? main.previousElementSibling : null;
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
                        top.style.width = main.scrollWidth + 'px';
                        top.firstElementChild.style.width = main.firstElementChild.offsetWidth + 'px';
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
