const splash = document.getElementById('splash');
const homeContent = document.getElementById('home-content');
const feDisplacementMap = document.querySelector('feDisplacementMap');
const feTurbulence = document.querySelector('feTurbulence');

let frame = 0;

splash.addEventListener('click', () => {
    // 1. 触发涟漪扭曲动画
    const rippleEffect = setInterval(() => {
        frame++;
        // 增加频率和扭曲程度，让网格扭曲更明显
        feTurbulence.setAttribute('baseFrequency', (frame * 0.005).toString()); // 降低频率，让波纹更大
        feDisplacementMap.setAttribute('scale', (frame * 20).toString()); // 增加力度
        
        if (frame > 60) { // 稍微延长一点动画时间
            clearInterval(rippleEffect);
            
            // 2. 切换页面状态
            splash.style.opacity = '0';
            splash.style.pointerEvents = 'none'; // 防止动画结束前多次点击
            
            setTimeout(() => {
                splash.style.display = 'none';
                homeContent.classList.remove('hidden');
                document.body.classList.add('light-mode'); // 切换到白底黑字模式
                document.body.style.overflow = 'auto'; // 恢复滚动
                document.body.style.cursor = 'auto'; // 恢复鼠标
            }, 800);
        }
    }, 16); // 约 60fps
});

// 初始禁止滚动
document.body.style.overflow = 'hidden';