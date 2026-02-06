const splash = document.getElementById('splash');
const homeContent = document.getElementById('home-content');
const feDisplacementMap = document.querySelector('feDisplacementMap');
const feTurbulence = document.querySelector('feTurbulence');

let frame = 0;

splash.addEventListener('click', () => {
    // 1. 触发涟漪扭曲动画
    const rippleEffect = setInterval(() => {
        frame++;
        // 动态改变滤镜频率和缩放值，形成水波纹扩散效果
        feTurbulence.setAttribute('baseFrequency', (frame * 0.01).toString());
        feDisplacementMap.setAttribute('scale', (frame * 10).toString());
        
        if (frame > 50) {
            clearInterval(rippleEffect);
            
            // 2. 切换页面状态
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
                homeContent.classList.remove('hidden');
                document.body.classList.add('light-mode');
                // 恢复滚动
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }, 20);
});

// 禁止欢迎页滚动
document.body.style.overflow = 'hidden';