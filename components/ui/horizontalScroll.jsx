'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, Observer } from 'gsap/all';
import 'tailwindcss/tailwind.css';

gsap.registerPlugin(ScrollTrigger, Observer);

const items = [139, 99, 104, 89, 140, 154, 106]; // different image ids

const HorizontalScroll = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const main = containerRef.current;

        if (!main) return;

        const itemTemplate = main.querySelector('.item');
        if (!itemTemplate) return;

        items.forEach((n, i) => {
            let item = itemTemplate.cloneNode(true);
            if (i === 0) item = itemTemplate;

            const txt = item.querySelector('.txt');
            const thumb = item.querySelector('.thumb');
            const img = thumb.querySelector('img');
            const overlay = item.querySelector('.overlay');
            const hit = item.querySelector('.hit');

            if (i !== 0) {
                main.append(item);
            }

            gsap.set(img, { attr: { src: '/images/promo.jpg' } });
            gsap.fromTo(img, { xPercent: -18 }, {
                scrollTrigger: {
                    trigger: item,
                    start: '0 100%',
                    end: '100% 0',
                    scrub: 0,
                    horizontal: true
                },
                xPercent: 0,
                ease: 'none'
            });

            item.onpointerenter = () => {
                gsap.to(overlay, { opacity: 0.5 });
                gsap.to(img, { duration: 0.3, scale: 1.2, overwrite: 'auto', ease: 'back' });
                gsap.to(item.querySelector('h2'), { color: 'rgb(160,180,225)' });
                gsap.to(item.querySelector('.item-info'), { opacity: 0.6 });
                gsap.to([thumb, txt], { ease: 'power3', yPercent: -6, overwrite: 'auto' });
            };

            item.onpointermove = (e) => {
                const xp = gsap.utils.interpolate(-40, 20, e.offsetX / 500);
                const yp = gsap.utils.interpolate(-40, 40, e.offsetY / 400);
                gsap.to(overlay, { duration: 0.7, ease: 'power2', x: xp * 4, y: yp * 4 });
                gsap.to([hit, thumb], { duration: 0.7, ease: 'power2', x: xp, y: yp });
                gsap.to([img], { duration: 0.7, ease: 'power2', x: -xp / 1.3, y: -yp / 1.3 });
                gsap.to(txt, { duration: 0.7, x: xp, y: yp });
            };

            item.onpointerleave = () => {
                gsap.to(overlay, { opacity: 0, x: 0, y: 0, overwrite: 'auto' });
                gsap.to(img, { duration: 0.3, scale: 1, x: 0, y: 0, overwrite: 'auto' });
                gsap.to(item.querySelector('h2'), { color: 'rgb(255,255,255)' });
                gsap.to(item.querySelector('.item-info'), { opacity: 0.2 });
                gsap.to([hit, thumb, txt], { duration: 0.7, x: 0, y: 0, yPercent: 0, ease: 'elastic.out(0.8)', overwrite: 'auto' });
            };
        });

        gsap.timeline()
            .to(main, { opacity: 1 })
            .from('.item', { x: window.innerWidth, stagger: 0.2, duration: 1, ease: 'elastic.out(0.3)' }, 0.4)
            .from('.txt', { x: window.innerWidth, stagger: 0.2, duration: 1, ease: 'elastic.out(0.2)' }, 0.44)
            .set(main, { pointerEvents: 'auto' }, 1)
            .add(() => {
                Observer.create({
                    target: window,
                    type: 'wheel,touch',
                    onChangeY: (self) => {
                        if (self.deltaY !== 0 && ScrollTrigger.isInViewport(main)) {
                            document.documentElement.scrollLeft += self.deltaY;
                            self.event.preventDefault();
                        }
                    },
                });
            }, 1);
    }, []);

    return (
        <div className="w-full overflow-hidden overflow-x-visible">
            <main ref={containerRef} className="opacity-0 flex items-center pointer-events-none">
                <div className="item relative w-[500px] h-[400px] m-[50px]">
                    <div className="thumb relative w-[500px] h-[250px] overflow-hidden">
                        <img src="https://picsum.photos/id/139/1500/500/" width="750" height="250" alt="Item" />
                        <div className="overlay absolute top-[-75px] left-0 h-[500px] bg-[radial-gradient(circle_at_50%,#fff_9%,rgba(255,255,255,0.25)_48%,rgba(255,255,255,0)_74%)] opacity-0 mix-blend-mode-overlay"></div>
                    </div>
                    <div className="txt pointer-events-none">
                        <h2 className="item-head text-white">Lorem Ipsum</h2>
                        <div className="item-info opacity-20 tracking-[0.2px]">
                            Sit amet, consectetur adipisci elit<br />sed eiusmod tempor incidunt
                        </div>
                    </div>
                    <div className="hit bg-transparent w-[540px] h-[440px] absolute top-[-20px] left-[-20px]"></div>
                </div>
            </main>
        </div>
    );
};

export default HorizontalScroll;
