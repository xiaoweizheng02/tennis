// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有链接的active类
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前链接的active类
            this.classList.add('active');
            
            // 滚动到目标区域
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 视频上传处理
    const videoUpload = document.getElementById('video-upload');
    const videoInfo = document.getElementById('video-info');
    
    // 点击文件信息区域触发文件选择
    videoInfo.addEventListener('click', function() {
        videoUpload.click();
    });
    
    // 文件选择后更新显示
    videoUpload.addEventListener('change', function() {
        if (this.files.length > 0) {
            videoInfo.textContent = this.files[0].name;
        } else {
            videoInfo.textContent = '未选择文件';
        }
    });

    // 视频分析按钮点击事件
    const analyzeVideoBtn = document.getElementById('analyze-video');
    const videoAnalysisResult = document.getElementById('video-analysis-result');
    
    analyzeVideoBtn.addEventListener('click', function() {
        // 获取表单数据
        const strokeType = document.getElementById('stroke-type').value;
        const analysisFocus = document.getElementById('analysis-focus').value;
        const userConcern = document.getElementById('user-concern').value;
        
        // 验证表单
        if (!videoUpload.files.length) {
            alert('请上传视频文件');
            return;
        }
        
        if (!strokeType) {
            alert('请选择击球类型');
            return;
        }
        
        // 显示加载状态
        videoAnalysisResult.innerHTML = '<p>正在分析视频，请稍候...</p>';
        videoAnalysisResult.classList.add('show');
        
        // 模拟分析过程
        setTimeout(() => {
            // 生成分析结果
            const result = generateVideoAnalysisResult(strokeType, analysisFocus, userConcern);
            videoAnalysisResult.innerHTML = result;
        }, 2000);
    });

    // 文字分析按钮点击事件
    const analyzeTextBtn = document.getElementById('analyze-text');
    const textAnalysisResult = document.getElementById('text-analysis-result');
    
    analyzeTextBtn.addEventListener('click', function() {
        const textDescription = document.getElementById('text-description').value;
        
        if (!textDescription.trim()) {
            alert('请描述你的动作');
            return;
        }
        
        // 显示加载状态
        textAnalysisResult.innerHTML = '<p>正在分析文字描述，请稍候...</p>';
        textAnalysisResult.classList.add('show');
        
        // 模拟分析过程
        setTimeout(() => {
            const result = generateTextAnalysisResult(textDescription);
            textAnalysisResult.innerHTML = result;
        }, 1500);
    });

    // 知识问答按钮点击事件
    const askQuestionBtn = document.getElementById('ask-question');
    const knowledgeAnswer = document.getElementById('knowledge-answer');
    
    askQuestionBtn.addEventListener('click', function() {
        const question = document.getElementById('knowledge-question').value;
        
        if (!question.trim()) {
            alert('请输入你的问题');
            return;
        }
        
        // 显示加载状态
        knowledgeAnswer.innerHTML = '<p>正在查找答案，请稍候...</p>';
        knowledgeAnswer.classList.add('show');
        
        // 模拟回答过程
        setTimeout(() => {
            const answer = generateKnowledgeAnswer(question);
            knowledgeAnswer.innerHTML = answer;
        }, 1500);
    });

    // 生成视频分析结果
    function generateVideoAnalysisResult(strokeType, analysisFocus, userConcern) {
        let strokeName = '';
        switch (strokeType) {
            case 'forehand': strokeName = '正手'; break;
            case 'backhand': strokeName = '反手'; break;
            case 'serve': strokeName = '发球'; break;
            case 'volley': strokeName = '截击'; break;
            default: strokeName = '其他';
        }
        
        return `
            <h3>🎾 动作分析报告</h3>
            <h4>分析项目：${strokeName}${analysisFocus ? ' - ' + analysisFocus : ''}</h4>
            <div class="analysis-content">
                <h4>📊 总体评分</h4>
                <p>7.5/10</p>
                
                <h4>✅ 优点</h4>
                <ul>
                    <li>准备姿势良好，重心稳定</li>
                    <li>引拍时机恰当</li>
                    <li>击球点位置合理</li>
                </ul>
                
                <h4>⚠️ 需要改进的地方</h4>
                <ul>
                    <li>随挥动作不够完整</li>
                    <li>重心转移不够充分</li>
                    ${userConcern ? `<li>${userConcern}</li>` : ''}
                </ul>
                
                <h4>📝 具体调整建议</h4>
                <ol>
                    <li>加强核心力量训练，提高身体稳定性</li>
                    <li>练习完整的随挥动作，确保球拍充分跟进</li>
                    <li>注意击球时的重心转移，从后脚向前脚过渡</li>
                </ol>
                
                <h4>🏋️ 推荐练习</h4>
                <ul>
                    <li>对着镜子练习挥拍动作，观察随挥是否完整</li>
                    <li>进行步法训练，提高移动速度和稳定性</li>
                    <li>多进行多球训练，巩固正确的动作定型</li>
                </ul>
            </div>
        `;
    }

    // 生成文字分析结果
    function generateTextAnalysisResult(description) {
        return `
            <h3>📝 文字分析报告</h3>
            <div class="analysis-content">
                <h4>📊 总体评分</h4>
                <p>8/10</p>
                
                <h4>✅ 优点</h4>
                <ul>
                    <li>握拍方式正确</li>
                    <li>站位合理</li>
                    <li>引拍动作规范</li>
                </ul>
                
                <h4>⚠️ 需要改进的地方</h4>
                <ul>
                    <li>击球点可以更靠前</li>
                    <li>随挥动作可以更完整</li>
                </ul>
                
                <h4>📝 具体调整建议</h4>
                <ol>
                    <li>提前准备，确保在最佳击球点击球</li>
                    <li>加强核心力量，提高身体协调性</li>
                    <li>练习时注意保持球拍的稳定性</li>
                </ol>
                
                <h4>🏋️ 推荐练习</h4>
                <ul>
                    <li>进行定点击球练习，找到最佳击球点</li>
                    <li>练习挥拍速度和力量控制</li>
                    <li>观看专业选手的比赛视频，学习他们的动作</li>
                </ul>
            </div>
        `;
    }

    // 生成知识问答答案
    function generateKnowledgeAnswer(question) {
        // 简单的关键词匹配
        const lowerQuestion = question.toLowerCase();
        
        if (lowerQuestion.includes('发球') && lowerQuestion.includes('力量')) {
            return `
                <h3>❓ 问题：${question}</h3>
                <div class="answer-content">
                    <p>要提高发球力量，可以从以下几个方面入手：</p>
                    <ol>
                        <li><strong>抛球位置</strong>：确保抛球在身体前方，高度合适，便于发力</li>
                        <li><strong>腿部力量</strong>：发球时充分利用腿部的蹬力，从地面开始发力</li>
                        <li><strong>躯干转动</strong>：利用躯干的转动产生力量，形成鞭打效应</li>
                        <li><strong>手臂动作</strong>：手臂从后下方向前上方挥动，形成完整的弧线</li>
                        <li><strong>球拍速度</strong>：在击球瞬间加速球拍，提高击球速度</li>
                    </ol>
                    <p>建议多进行发球专项练习，逐渐增加力量，同时注意动作的正确性，避免受伤。</p>
                </div>
            `;
        } else if (lowerQuestion.includes('正手') && lowerQuestion.includes('握拍')) {
            return `
                <h3>❓ 问题：${question}</h3>
                <div class="answer-content">
                    <p>正手推荐使用以下握拍方式：</p>
                    <ul>
                        <li><strong>半西方式握拍</strong>：适合大多数球员，提供良好的力量和控制</li>
                        <li><strong>西方式握拍</strong>：适合上旋球，击球力量大</li>
                        <li><strong>东方式握拍</strong>：适合平击球，控制精确</li>
                    </ul>
                    <p>选择握拍方式时，应根据个人的打法风格和身体条件来决定。初学者建议从半西方式握拍开始，随着技术的提高再进行调整。</p>
                </div>
            `;
        } else {
            return `
                <h3>❓ 问题：${question}</h3>
                <div class="answer-content">
                    <p>感谢你的问题！关于网球技术，这里有一些通用的建议：</p>
                    <ol>
                        <li>保持正确的基本姿势和握拍方式</li>
                        <li>注重步法训练，提高移动速度和稳定性</li>
                        <li>多进行多球训练，巩固技术动作</li>
                        <li>观看专业比赛，学习顶级选手的技术</li>
                        <li>定期进行身体训练，提高力量和耐力</li>
                    </ol>
                    <p>如果你有更具体的问题，欢迎随时咨询！</p>
                </div>
            `;
        }
    }

    // 监听滚动事件，更新导航链接状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section, #home');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
});