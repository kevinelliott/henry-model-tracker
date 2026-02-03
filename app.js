// Agent Model Performance Tracker - Core Application Logic

// ============================================
// Data Store
// ============================================
const Store = {
    MODELS_KEY: 'model_tracker_models',
    BENCHMARKS_KEY: 'model_tracker_benchmarks',

    // Default models to seed the tracker
    defaultModels: [
        // OpenAI - Reasoning models
        { id: 'o1', name: 'o1', provider: 'OpenAI', category: 'reasoning', costPer1M: 60.00 },
        { id: 'o1-pro', name: 'o1 Pro', provider: 'OpenAI', category: 'reasoning', costPer1M: 150.00 },
        { id: 'o1-mini', name: 'o1 Mini', provider: 'OpenAI', category: 'reasoning', costPer1M: 12.00 },
        { id: 'o3-mini', name: 'o3 Mini', provider: 'OpenAI', category: 'reasoning', costPer1M: 4.40 },
        // OpenAI - GPT models
        { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', category: 'general', costPer1M: 5.00 },
        { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', category: 'fast', costPer1M: 0.60 },
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', category: 'general', costPer1M: 10.00 },
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', category: 'fast', costPer1M: 0.50 },
        // Anthropic
        { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic', category: 'reasoning', costPer1M: 75.00 },
        { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', category: 'general', costPer1M: 15.00 },
        { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', category: 'general', costPer1M: 15.00 },
        { id: 'claude-3.5-haiku', name: 'Claude 3.5 Haiku', provider: 'Anthropic', category: 'fast', costPer1M: 1.00 },
        { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', category: 'reasoning', costPer1M: 75.00 },
        { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', category: 'fast', costPer1M: 0.25 },
        // Google
        { id: 'gemini-2-pro', name: 'Gemini 2.0 Pro', provider: 'Google', category: 'reasoning', costPer1M: 7.00 },
        { id: 'gemini-2-flash', name: 'Gemini 2.0 Flash', provider: 'Google', category: 'fast', costPer1M: 0.40 },
        { id: 'gemini-2-flash-thinking', name: 'Gemini 2.0 Flash Thinking', provider: 'Google', category: 'reasoning', costPer1M: 0.70 },
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', category: 'general', costPer1M: 3.50 },
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', category: 'fast', costPer1M: 0.15 },
        // xAI
        { id: 'grok-2', name: 'Grok 2', provider: 'xAI', category: 'general', costPer1M: 10.00 },
        { id: 'grok-3', name: 'Grok 3', provider: 'xAI', category: 'reasoning', costPer1M: 15.00 },
        { id: 'grok-3-mini', name: 'Grok 3 Mini', provider: 'xAI', category: 'fast', costPer1M: 3.00 },
        // DeepSeek
        { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', category: 'reasoning', costPer1M: 2.19 },
        { id: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek R1 Distill Llama 70B', provider: 'DeepSeek', category: 'reasoning', costPer1M: 0.90 },
        { id: 'deepseek-r1-distill-qwen-32b', name: 'DeepSeek R1 Distill Qwen 32B', provider: 'DeepSeek', category: 'reasoning', costPer1M: 0.55 },
        { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', category: 'coding', costPer1M: 0.89 },
        { id: 'deepseek-coder-v2', name: 'DeepSeek Coder V2', provider: 'DeepSeek', category: 'coding', costPer1M: 0.28 },
        // Meta
        { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'Meta', category: 'general', costPer1M: 0.90 },
        { id: 'llama-3.1-405b', name: 'Llama 3.1 405B', provider: 'Meta', category: 'reasoning', costPer1M: 3.00 },
        { id: 'llama-3.2-90b-vision', name: 'Llama 3.2 90B Vision', provider: 'Meta', category: 'multimodal', costPer1M: 1.80 },
        // Mistral
        { id: 'mistral-large-2', name: 'Mistral Large 2', provider: 'Mistral', category: 'general', costPer1M: 6.00 },
        { id: 'mistral-medium', name: 'Mistral Medium', provider: 'Mistral', category: 'general', costPer1M: 2.70 },
        { id: 'mixtral-8x22b', name: 'Mixtral 8x22B', provider: 'Mistral', category: 'general', costPer1M: 1.20 },
        { id: 'codestral', name: 'Codestral', provider: 'Mistral', category: 'coding', costPer1M: 0.30 },
        { id: 'mistral-small', name: 'Mistral Small', provider: 'Mistral', category: 'fast', costPer1M: 0.60 },
        // Cohere
        { id: 'command-r-plus', name: 'Command R+', provider: 'Cohere', category: 'general', costPer1M: 15.00 },
        { id: 'command-r', name: 'Command R', provider: 'Cohere', category: 'general', costPer1M: 3.00 },
        // Alibaba
        { id: 'qwen-2.5-72b', name: 'Qwen 2.5 72B', provider: 'Alibaba', category: 'general', costPer1M: 0.90 },
        { id: 'qwen-2.5-coder-32b', name: 'Qwen 2.5 Coder 32B', provider: 'Alibaba', category: 'coding', costPer1M: 0.35 },
        // 01.AI
        { id: 'yi-lightning', name: 'Yi Lightning', provider: '01.AI', category: 'fast', costPer1M: 0.14 },
        { id: 'yi-large', name: 'Yi Large', provider: '01.AI', category: 'general', costPer1M: 3.00 },
        // Amazon
        { id: 'nova-pro', name: 'Amazon Nova Pro', provider: 'Amazon', category: 'general', costPer1M: 3.20 },
        { id: 'nova-lite', name: 'Amazon Nova Lite', provider: 'Amazon', category: 'fast', costPer1M: 0.24 }
    ],

    // Sample benchmarks to seed the tracker
    defaultBenchmarks: [
        { id: 'b1', modelId: 'claude-opus-4', task: 'reasoning', success: true, quality: 9.5, time: 8.2, tokens: 2500, timestamp: Date.now() - 86400000, notes: 'Complex multi-step problem' },
        { id: 'b2', modelId: 'claude-opus-4', task: 'coding', success: true, quality: 9.2, time: 12.1, tokens: 3200, timestamp: Date.now() - 172800000, notes: 'Full stack feature' },
        { id: 'b3', modelId: 'claude-sonnet-4', task: 'general', success: true, quality: 8.8, time: 3.4, tokens: 1200, timestamp: Date.now() - 86400000, notes: '' },
        { id: 'b4', modelId: 'claude-sonnet-4', task: 'coding', success: true, quality: 8.5, time: 4.2, tokens: 1500, timestamp: Date.now() - 259200000, notes: 'Bug fix' },
        { id: 'b5', modelId: 'gpt-4o', task: 'general', success: true, quality: 8.7, time: 2.8, tokens: 1100, timestamp: Date.now() - 86400000, notes: '' },
        { id: 'b6', modelId: 'gpt-4o', task: 'creative', success: true, quality: 8.3, time: 3.1, tokens: 900, timestamp: Date.now() - 172800000, notes: 'Story generation' },
        { id: 'b7', modelId: 'gpt-4-turbo', task: 'reasoning', success: true, quality: 8.4, time: 5.5, tokens: 2000, timestamp: Date.now() - 345600000, notes: '' },
        { id: 'b8', modelId: 'gpt-3.5-turbo', task: 'general', success: true, quality: 7.2, time: 0.8, tokens: 600, timestamp: Date.now() - 86400000, notes: 'Simple query' },
        { id: 'b9', modelId: 'gpt-3.5-turbo', task: 'coding', success: false, quality: 5.5, time: 1.2, tokens: 800, timestamp: Date.now() - 172800000, notes: 'Failed complex task' },
        { id: 'b10', modelId: 'gemini-2-flash', task: 'fast', success: true, quality: 7.8, time: 0.6, tokens: 500, timestamp: Date.now() - 86400000, notes: 'Quick response' },
        { id: 'b11', modelId: 'deepseek-r1', task: 'reasoning', success: true, quality: 9.1, time: 15.3, tokens: 4500, timestamp: Date.now() - 86400000, notes: 'Math proof' },
        { id: 'b12', modelId: 'deepseek-v3', task: 'coding', success: true, quality: 8.9, time: 2.1, tokens: 1800, timestamp: Date.now() - 172800000, notes: 'Algorithm implementation' },
        { id: 'b13', modelId: 'claude-3.5-sonnet', task: 'general', success: true, quality: 8.6, time: 2.9, tokens: 1100, timestamp: Date.now() - 432000000, notes: '' },
        { id: 'b14', modelId: 'claude-3.5-haiku', task: 'qa', success: true, quality: 7.9, time: 0.7, tokens: 400, timestamp: Date.now() - 86400000, notes: 'Quick fact check' },
        { id: 'b15', modelId: 'llama-3.3-70b', task: 'general', success: true, quality: 8.1, time: 3.5, tokens: 1300, timestamp: Date.now() - 259200000, notes: '' }
    ],

    getModels() {
        const stored = localStorage.getItem(this.MODELS_KEY);
        if (!stored) {
            this.saveModels(this.defaultModels);
            return this.defaultModels;
        }
        return JSON.parse(stored);
    },

    saveModels(models) {
        localStorage.setItem(this.MODELS_KEY, JSON.stringify(models));
    },

    addModel(model) {
        const models = this.getModels();
        model.id = model.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        models.push(model);
        this.saveModels(models);
        return model;
    },

    deleteModel(modelId) {
        const models = this.getModels().filter(m => m.id !== modelId);
        this.saveModels(models);
        // Also delete related benchmarks
        const benchmarks = this.getBenchmarks().filter(b => b.modelId !== modelId);
        this.saveBenchmarks(benchmarks);
    },

    getBenchmarks() {
        const stored = localStorage.getItem(this.BENCHMARKS_KEY);
        if (!stored) {
            this.saveBenchmarks(this.defaultBenchmarks);
            return this.defaultBenchmarks;
        }
        return JSON.parse(stored);
    },

    saveBenchmarks(benchmarks) {
        localStorage.setItem(this.BENCHMARKS_KEY, JSON.stringify(benchmarks));
    },

    addBenchmark(benchmark) {
        const benchmarks = this.getBenchmarks();
        benchmark.id = 'b' + Date.now();
        benchmark.timestamp = Date.now();
        benchmarks.push(benchmark);
        this.saveBenchmarks(benchmarks);
        return benchmark;
    },

    exportData() {
        return {
            models: this.getModels(),
            benchmarks: this.getBenchmarks(),
            exportedAt: new Date().toISOString()
        };
    },

    importData(data) {
        if (data.models) this.saveModels(data.models);
        if (data.benchmarks) this.saveBenchmarks(data.benchmarks);
    }
};

// ============================================
// Analytics Engine
// ============================================
const Analytics = {
    getModelStats(modelId) {
        const benchmarks = Store.getBenchmarks().filter(b => b.modelId === modelId);
        if (benchmarks.length === 0) {
            return {
                totalRuns: 0,
                successRate: 0,
                avgQuality: 0,
                avgTime: 0,
                avgTokens: 0,
                totalCost: 0
            };
        }

        const model = Store.getModels().find(m => m.id === modelId);
        const totalTokens = benchmarks.reduce((sum, b) => sum + (b.tokens || 0), 0);

        return {
            totalRuns: benchmarks.length,
            successRate: (benchmarks.filter(b => b.success).length / benchmarks.length) * 100,
            avgQuality: benchmarks.reduce((sum, b) => sum + b.quality, 0) / benchmarks.length,
            avgTime: benchmarks.reduce((sum, b) => sum + b.time, 0) / benchmarks.length,
            avgTokens: totalTokens / benchmarks.length,
            totalCost: model ? (totalTokens / 1000000) * model.costPer1M : 0
        };
    },

    getAllModelStats() {
        const models = Store.getModels();
        return models.map(model => ({
            ...model,
            stats: this.getModelStats(model.id)
        })).filter(m => m.stats.totalRuns > 0);
    },

    getTopPerformer() {
        const stats = this.getAllModelStats();
        if (stats.length === 0) return null;
        
        // Score based on quality * success rate, normalized
        return stats.reduce((best, current) => {
            const currentScore = current.stats.avgQuality * (current.stats.successRate / 100);
            const bestScore = best.stats.avgQuality * (best.stats.successRate / 100);
            return currentScore > bestScore ? current : best;
        });
    },

    getRecommendation(useCase) {
        const allStats = this.getAllModelStats();
        if (allStats.length === 0) return null;

        let sortFn;
        let reasons = [];

        switch (useCase) {
            case 'coding':
                sortFn = (a, b) => {
                    const aCoding = Store.getBenchmarks().filter(x => x.modelId === a.id && x.task === 'coding');
                    const bCoding = Store.getBenchmarks().filter(x => x.modelId === b.id && x.task === 'coding');
                    const aScore = aCoding.length > 0 ? aCoding.reduce((s, x) => s + x.quality, 0) / aCoding.length : 0;
                    const bScore = bCoding.length > 0 ? bCoding.reduce((s, x) => s + x.quality, 0) / bCoding.length : 0;
                    return bScore - aScore;
                };
                reasons = ['Best quality scores on coding tasks', 'Reliable code generation', 'Good at debugging'];
                break;

            case 'reasoning':
                sortFn = (a, b) => {
                    const aReasoning = Store.getBenchmarks().filter(x => x.modelId === a.id && x.task === 'reasoning');
                    const bReasoning = Store.getBenchmarks().filter(x => x.modelId === b.id && x.task === 'reasoning');
                    const aScore = aReasoning.length > 0 ? aReasoning.reduce((s, x) => s + x.quality, 0) / aReasoning.length : 0;
                    const bScore = bReasoning.length > 0 ? bReasoning.reduce((s, x) => s + x.quality, 0) / bReasoning.length : 0;
                    return bScore - aScore;
                };
                reasons = ['Excels at complex analysis', 'Strong logical reasoning', 'Handles multi-step problems'];
                break;

            case 'creative':
                sortFn = (a, b) => {
                    const aCreative = Store.getBenchmarks().filter(x => x.modelId === a.id && x.task === 'creative');
                    const bCreative = Store.getBenchmarks().filter(x => x.modelId === b.id && x.task === 'creative');
                    const aScore = aCreative.length > 0 ? aCreative.reduce((s, x) => s + x.quality, 0) / aCreative.length : 0;
                    const bScore = bCreative.length > 0 ? bCreative.reduce((s, x) => s + x.quality, 0) / bCreative.length : 0;
                    return bScore - aScore;
                };
                reasons = ['Best creative output quality', 'Diverse writing styles', 'Engaging narratives'];
                break;

            case 'fast':
                sortFn = (a, b) => a.stats.avgTime - b.stats.avgTime;
                reasons = ['Fastest average response time', 'Low latency for real-time use', 'Efficient token usage'];
                break;

            case 'budget':
                sortFn = (a, b) => {
                    const aCostEfficiency = a.stats.avgQuality / (a.costPer1M || 1);
                    const bCostEfficiency = b.stats.avgQuality / (b.costPer1M || 1);
                    return bCostEfficiency - aCostEfficiency;
                };
                reasons = ['Best quality per dollar', 'Low cost per 1M tokens', 'Good balance of price and performance'];
                break;

            case 'quality':
            default:
                sortFn = (a, b) => {
                    const aScore = a.stats.avgQuality * (a.stats.successRate / 100);
                    const bScore = b.stats.avgQuality * (b.stats.successRate / 100);
                    return bScore - aScore;
                };
                reasons = ['Highest overall quality scores', 'Best success rate', 'Most reliable performance'];
                break;
        }

        const sorted = [...allStats].sort(sortFn);
        return sorted.length > 0 ? { model: sorted[0], reasons } : null;
    },

    compareModels(modelId1, modelId2) {
        const stats1 = this.getModelStats(modelId1);
        const stats2 = this.getModelStats(modelId2);
        const model1 = Store.getModels().find(m => m.id === modelId1);
        const model2 = Store.getModels().find(m => m.id === modelId2);

        return {
            model1: { ...model1, stats: stats1 },
            model2: { ...model2, stats: stats2 },
            comparison: {
                successRate: { 
                    diff: stats1.successRate - stats2.successRate, 
                    winner: stats1.successRate > stats2.successRate ? 1 : 2 
                },
                quality: { 
                    diff: stats1.avgQuality - stats2.avgQuality, 
                    winner: stats1.avgQuality > stats2.avgQuality ? 1 : 2 
                },
                speed: { 
                    diff: stats2.avgTime - stats1.avgTime, 
                    winner: stats1.avgTime < stats2.avgTime ? 1 : 2 
                },
                cost: { 
                    diff: (model2?.costPer1M || 0) - (model1?.costPer1M || 0), 
                    winner: (model1?.costPer1M || 0) < (model2?.costPer1M || 0) ? 1 : 2 
                }
            }
        };
    }
};

// ============================================
// Charts
// ============================================
let charts = {};

const ChartManager = {
    colors: {
        primary: '#6366f1',
        primaryLight: '#818cf8',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        text: '#94a3b8'
    },

    palette: [
        '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
        '#ec4899', '#3b82f6', '#14b8a6', '#f97316', '#84cc16'
    ],

    init() {
        Chart.defaults.color = this.colors.text;
        Chart.defaults.borderColor = '#334155';
    },

    renderSuccessChart() {
        const ctx = document.getElementById('successChart');
        if (!ctx) return;

        const stats = Analytics.getAllModelStats();
        
        if (charts.success) charts.success.destroy();
        
        charts.success = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: stats.map(s => s.name),
                datasets: [{
                    label: 'Success Rate %',
                    data: stats.map(s => s.stats.successRate.toFixed(1)),
                    backgroundColor: stats.map((_, i) => this.palette[i % this.palette.length]),
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { 
                        beginAtZero: true, 
                        max: 100,
                        grid: { color: '#334155' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    },

    renderCostQualityChart() {
        const ctx = document.getElementById('costQualityChart');
        if (!ctx) return;

        const stats = Analytics.getAllModelStats();
        
        if (charts.costQuality) charts.costQuality.destroy();
        
        charts.costQuality = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: stats.map((s, i) => ({
                    label: s.name,
                    data: [{ x: s.costPer1M || 0, y: s.stats.avgQuality }],
                    backgroundColor: this.palette[i % this.palette.length],
                    pointRadius: 10,
                    pointHoverRadius: 12
                }))
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                },
                scales: {
                    x: { 
                        title: { display: true, text: 'Cost per 1M tokens ($)' },
                        grid: { color: '#334155' }
                    },
                    y: { 
                        title: { display: true, text: 'Avg Quality Score' },
                        beginAtZero: true, 
                        max: 10,
                        grid: { color: '#334155' }
                    }
                }
            }
        });
    },

    renderTimeChart() {
        const ctx = document.getElementById('timeChart');
        if (!ctx) return;

        const stats = Analytics.getAllModelStats();
        
        if (charts.time) charts.time.destroy();
        
        charts.time = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: stats.map(s => s.name),
                datasets: [{
                    label: 'Avg Response Time (s)',
                    data: stats.map(s => s.stats.avgTime.toFixed(2)),
                    backgroundColor: this.colors.primary,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { 
                        beginAtZero: true,
                        grid: { color: '#334155' }
                    },
                    y: {
                        grid: { display: false }
                    }
                }
            }
        });
    },

    renderQualityChart() {
        const ctx = document.getElementById('qualityChart');
        if (!ctx) return;

        const stats = Analytics.getAllModelStats();
        
        if (charts.quality) charts.quality.destroy();
        
        charts.quality = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Quality', 'Speed', 'Success', 'Cost Eff.', 'Volume'],
                datasets: stats.slice(0, 5).map((s, i) => {
                    const maxTime = Math.max(...stats.map(x => x.stats.avgTime)) || 1;
                    const maxCost = Math.max(...stats.map(x => x.costPer1M)) || 1;
                    const maxRuns = Math.max(...stats.map(x => x.stats.totalRuns)) || 1;
                    
                    return {
                        label: s.name,
                        data: [
                            s.stats.avgQuality,
                            10 - (s.stats.avgTime / maxTime) * 10,
                            s.stats.successRate / 10,
                            10 - ((s.costPer1M || 0) / maxCost) * 10,
                            (s.stats.totalRuns / maxRuns) * 10
                        ],
                        borderColor: this.palette[i],
                        backgroundColor: this.palette[i] + '33',
                        pointBackgroundColor: this.palette[i]
                    };
                })
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        grid: { color: '#334155' },
                        pointLabels: { color: '#94a3b8' }
                    }
                }
            }
        });
    },

    renderAll() {
        this.renderSuccessChart();
        this.renderCostQualityChart();
        this.renderTimeChart();
        this.renderQualityChart();
    }
};

// ============================================
// UI Components
// ============================================
const UI = {
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => toast.className = 'toast', 3000);
    },

    switchTab(tabName) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
    },

    updateDashboard() {
        const models = Store.getModels();
        const benchmarks = Store.getBenchmarks();
        const top = Analytics.getTopPerformer();

        document.getElementById('totalModels').textContent = models.length;
        document.getElementById('totalBenchmarks').textContent = benchmarks.length;

        if (benchmarks.length > 0) {
            const avgSuccess = benchmarks.filter(b => b.success).length / benchmarks.length * 100;
            document.getElementById('avgSuccess').textContent = avgSuccess.toFixed(0) + '%';
        }

        if (top) {
            document.getElementById('topModel').textContent = top.name;
        }

        ChartManager.renderAll();
    },

    renderModels() {
        const models = Store.getModels();
        const container = document.getElementById('modelsList');

        if (models.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🤖</div>
                    <h3>No models yet</h3>
                    <p>Add your first model to start tracking</p>
                </div>
            `;
            return;
        }

        container.innerHTML = models.map(model => {
            const stats = Analytics.getModelStats(model.id);
            return `
                <div class="model-card">
                    <div class="model-header">
                        <div>
                            <div class="model-name">${model.name}</div>
                            <div class="model-provider">${model.provider}</div>
                        </div>
                        <span class="model-badge ${model.category}">${model.category}</span>
                    </div>
                    <div class="model-stats">
                        <div class="model-stat">
                            <span class="model-stat-value">${stats.successRate.toFixed(0)}%</span>
                            <span class="model-stat-label">Success</span>
                        </div>
                        <div class="model-stat">
                            <span class="model-stat-value">${stats.avgQuality.toFixed(1)}</span>
                            <span class="model-stat-label">Avg Quality</span>
                        </div>
                        <div class="model-stat">
                            <span class="model-stat-value">${stats.avgTime.toFixed(1)}s</span>
                            <span class="model-stat-label">Avg Time</span>
                        </div>
                        <div class="model-stat">
                            <span class="model-stat-value">$${model.costPer1M?.toFixed(2) || '0.00'}</span>
                            <span class="model-stat-label">$/1M tokens</span>
                        </div>
                    </div>
                    <div class="model-actions">
                        <button class="btn btn-secondary" onclick="App.viewModelDetails('${model.id}')">Details</button>
                        <button class="btn btn-danger" onclick="App.deleteModel('${model.id}')">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    populateModelSelects() {
        const models = Store.getModels();
        const selects = ['benchModel', 'compareModel1', 'compareModel2'];
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (!select) return;
            
            const current = select.value;
            select.innerHTML = '<option value="">Select model...</option>' + 
                models.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
            select.value = current;
        });
    },

    renderComparison(modelId1, modelId2) {
        const container = document.getElementById('comparisonResult');
        
        if (!modelId1 || !modelId2) {
            container.innerHTML = '<p class="empty-state">Select two models to compare</p>';
            return;
        }

        const comparison = Analytics.compareModels(modelId1, modelId2);
        const { model1, model2 } = comparison;

        const renderCard = (model, num) => {
            const isWinner = (metric) => comparison.comparison[metric].winner === num;
            const winnerClass = (metric) => isWinner(metric) ? 'better' : 'worse';
            
            return `
                <div class="compare-card">
                    <h4>${model.name}</h4>
                    <div class="compare-row">
                        <span class="compare-label">Provider</span>
                        <span class="compare-value">${model.provider}</span>
                    </div>
                    <div class="compare-row">
                        <span class="compare-label">Success Rate</span>
                        <span class="compare-value ${winnerClass('successRate')}">${model.stats.successRate.toFixed(1)}%</span>
                    </div>
                    <div class="compare-row">
                        <span class="compare-label">Avg Quality</span>
                        <span class="compare-value ${winnerClass('quality')}">${model.stats.avgQuality.toFixed(2)}</span>
                    </div>
                    <div class="compare-row">
                        <span class="compare-label">Avg Response Time</span>
                        <span class="compare-value ${winnerClass('speed')}">${model.stats.avgTime.toFixed(2)}s</span>
                    </div>
                    <div class="compare-row">
                        <span class="compare-label">Cost per 1M tokens</span>
                        <span class="compare-value ${winnerClass('cost')}">$${model.costPer1M?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div class="compare-row">
                        <span class="compare-label">Total Benchmarks</span>
                        <span class="compare-value">${model.stats.totalRuns}</span>
                    </div>
                </div>
            `;
        };

        container.innerHTML = renderCard(model1, 1) + renderCard(model2, 2);
    },

    renderRecommendation(useCase) {
        const container = document.getElementById('recommendationResult');
        
        if (!useCase) {
            container.innerHTML = '<p class="empty-state">Select a use case to get a recommendation</p>';
            container.className = 'recommendation-card empty';
            return;
        }

        const result = Analytics.getRecommendation(useCase);
        
        if (!result) {
            container.innerHTML = '<p>Not enough data for recommendations. Add more benchmarks!</p>';
            container.className = 'recommendation-card empty';
            return;
        }

        const { model, reasons } = result;
        const icons = {
            coding: '💻',
            reasoning: '🧠',
            creative: '🎨',
            fast: '⚡',
            budget: '💰',
            quality: '🏆'
        };

        container.className = 'recommendation-card';
        container.innerHTML = `
            <div class="recommendation-header">
                <span class="recommendation-icon">${icons[useCase] || '🎯'}</span>
                <div>
                    <div class="recommendation-title">${model.name}</div>
                    <div class="recommendation-subtitle">${model.provider} · ${model.category}</div>
                </div>
            </div>
            <ul class="recommendation-reasons">
                ${reasons.map(r => `<li>${r}</li>`).join('')}
            </ul>
            <div class="recommendation-stats">
                <div class="rec-stat">
                    <span class="rec-stat-value">${model.stats.successRate.toFixed(0)}%</span>
                    <span class="rec-stat-label">Success Rate</span>
                </div>
                <div class="rec-stat">
                    <span class="rec-stat-value">${model.stats.avgQuality.toFixed(1)}</span>
                    <span class="rec-stat-label">Avg Quality</span>
                </div>
                <div class="rec-stat">
                    <span class="rec-stat-value">$${model.costPer1M?.toFixed(2) || '0'}</span>
                    <span class="rec-stat-label">per 1M tokens</span>
                </div>
            </div>
        `;
    }
};

// ============================================
// App Controller
// ============================================
const App = {
    init() {
        ChartManager.init();
        this.bindEvents();
        this.refresh();
    },

    refresh() {
        UI.updateDashboard();
        UI.renderModels();
        UI.populateModelSelects();
    },

    bindEvents() {
        // Tab navigation
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => UI.switchTab(tab.dataset.tab));
        });

        // Add Model
        document.getElementById('addModelBtn')?.addEventListener('click', () => {
            document.getElementById('addModelModal').classList.add('active');
        });

        document.getElementById('cancelModel')?.addEventListener('click', () => {
            document.getElementById('addModelModal').classList.remove('active');
        });

        document.getElementById('addModelForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const model = {
                name: document.getElementById('modelName').value,
                provider: document.getElementById('modelProvider').value,
                category: document.getElementById('modelCategory').value,
                costPer1M: parseFloat(document.getElementById('modelCost').value) || 0
            };
            Store.addModel(model);
            document.getElementById('addModelModal').classList.remove('active');
            document.getElementById('addModelForm').reset();
            this.refresh();
            UI.showToast('Model added successfully!');
        });

        // Add Benchmark
        document.getElementById('benchmarkForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const benchmark = {
                modelId: document.getElementById('benchModel').value,
                task: document.getElementById('benchTask').value,
                success: document.getElementById('benchSuccess').value === 'true',
                quality: parseFloat(document.getElementById('benchQuality').value),
                time: parseFloat(document.getElementById('benchTime').value),
                tokens: parseInt(document.getElementById('benchTokens').value) || 0,
                notes: document.getElementById('benchNotes').value
            };
            Store.addBenchmark(benchmark);
            document.getElementById('benchmarkForm').reset();
            this.refresh();
            UI.showToast('Benchmark recorded!');
            UI.switchTab('dashboard');
        });

        // Compare
        document.getElementById('compareBtn')?.addEventListener('click', () => {
            const m1 = document.getElementById('compareModel1').value;
            const m2 = document.getElementById('compareModel2').value;
            UI.renderComparison(m1, m2);
        });

        // Recommendations
        document.getElementById('getRecommendation')?.addEventListener('click', () => {
            const useCase = document.getElementById('useCase').value;
            UI.renderRecommendation(useCase);
        });

        // Quick Use Case Buttons (Dashboard)
        document.querySelectorAll('.use-case-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active state
                document.querySelectorAll('.use-case-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show quick recommendation
                const useCase = btn.dataset.use;
                this.showQuickRecommendation(useCase);
            });
        });

        // Export/Import
        document.getElementById('exportBtn')?.addEventListener('click', () => {
            const data = Store.exportData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `model-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            UI.showToast('Data exported!');
        });

        document.getElementById('importBtn')?.addEventListener('click', () => {
            document.getElementById('importFile').click();
        });

        document.getElementById('importFile')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    Store.importData(data);
                    this.refresh();
                    UI.showToast('Data imported successfully!');
                } catch (err) {
                    UI.showToast('Invalid file format', 'error');
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        });
    },

    deleteModel(modelId) {
        if (confirm('Delete this model and all its benchmarks?')) {
            Store.deleteModel(modelId);
            this.refresh();
            UI.showToast('Model deleted');
        }
    },

    viewModelDetails(modelId) {
        // Switch to compare tab with this model pre-selected
        UI.switchTab('compare');
        document.getElementById('compareModel1').value = modelId;
    },

    showQuickRecommendation(useCase) {
        const container = document.getElementById('quickRecommendation');
        if (!container) return;

        const models = Store.getModels();
        const stats = Analytics.getModelStats();
        
        // Find best models for use case
        let recommendations = [];
        
        switch(useCase) {
            case 'coding':
                recommendations = models
                    .filter(m => m.category === 'coding' || ['deepseek', 'codestral', 'coder'].some(k => m.id.toLowerCase().includes(k)))
                    .sort((a, b) => (stats[b.id]?.avgQuality || 0) - (stats[a.id]?.avgQuality || 0));
                if (recommendations.length === 0) {
                    recommendations = models.filter(m => m.category === 'coding' || m.category === 'general').slice(0, 5);
                }
                break;
            case 'reasoning':
                recommendations = models
                    .filter(m => m.category === 'reasoning' || ['o1', 'o3', 'opus', 'r1'].some(k => m.id.toLowerCase().includes(k)))
                    .sort((a, b) => (stats[b.id]?.avgQuality || 0) - (stats[a.id]?.avgQuality || 0));
                break;
            case 'creative':
                recommendations = models
                    .filter(m => m.category === 'creative' || m.category === 'general')
                    .sort((a, b) => (stats[b.id]?.avgQuality || 0) - (stats[a.id]?.avgQuality || 0));
                break;
            case 'fast':
                recommendations = models
                    .filter(m => m.category === 'fast' || ['mini', 'flash', 'haiku', 'small', 'lite'].some(k => m.id.toLowerCase().includes(k)))
                    .sort((a, b) => (a.costPer1M || 999) - (b.costPer1M || 999));
                break;
            case 'budget':
                recommendations = [...models].sort((a, b) => (a.costPer1M || 999) - (b.costPer1M || 999));
                break;
            case 'quality':
                recommendations = [...models].sort((a, b) => {
                    const qualA = stats[a.id]?.avgQuality || 0;
                    const qualB = stats[b.id]?.avgQuality || 0;
                    if (qualA !== qualB) return qualB - qualA;
                    return (b.costPer1M || 0) - (a.costPer1M || 0); // Higher cost = usually better
                });
                break;
        }

        if (recommendations.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted);">No models match this use case. Add some benchmarks!</p>';
            container.classList.add('visible');
            return;
        }

        const top = recommendations[0];
        const alternatives = recommendations.slice(1, 4);
        
        const useCaseLabels = {
            coding: '💻 Best for Coding',
            reasoning: '🧠 Best for Reasoning',
            creative: '✨ Best for Creative',
            fast: '⚡ Fastest Options',
            budget: '💰 Most Cost-Effective',
            quality: '🏆 Highest Quality'
        };

        container.innerHTML = \`
            <h3>\${useCaseLabels[useCase] || 'Recommendation'}</h3>
            <div class="top-pick">
                <div>
                    <div class="model-name">\${top.name}</div>
                    <div class="provider">\${top.provider}</div>
                </div>
                <div class="cost">\$\${top.costPer1M?.toFixed(2) || '?'}/1M tokens</div>
            </div>
            \${alternatives.length > 0 ? \`
                <div class="alternatives">
                    <h4>Also consider:</h4>
                    <div class="alt-list">
                        \${alternatives.map(m => \`<span class="alt-chip">\${m.name}</span>\`).join('')}
                    </div>
                </div>
            \` : ''}
        \`;
        container.classList.add('visible');
    }
};

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => App.init());

// Expose App globally for inline handlers
window.App = App;
