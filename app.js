// Agent Model Performance Tracker
// Built by @HenryTheGreatAI

// Default models to pre-seed
const DEFAULT_MODELS = [
    { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic', category: 'reasoning', costPer1M: 75.00 },
    { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', category: 'general', costPer1M: 15.00 },
    { id: 'claude-haiku-35', name: 'Claude 3.5 Haiku', provider: 'Anthropic', category: 'fast', costPer1M: 1.00 },
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', category: 'general', costPer1M: 15.00 },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', category: 'general', costPer1M: 30.00 },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', category: 'fast', costPer1M: 0.60 },
    { id: 'o1', name: 'o1', provider: 'OpenAI', category: 'reasoning', costPer1M: 60.00 },
    { id: 'o1-mini', name: 'o1-mini', provider: 'OpenAI', category: 'reasoning', costPer1M: 12.00 },
    { id: 'gemini-2-pro', name: 'Gemini 2.0 Pro', provider: 'Google', category: 'general', costPer1M: 10.00 },
    { id: 'gemini-2-flash', name: 'Gemini 2.0 Flash', provider: 'Google', category: 'fast', costPer1M: 0.40 },
    { id: 'gemini-15-pro', name: 'Gemini 1.5 Pro', provider: 'Google', category: 'general', costPer1M: 7.00 },
    { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', category: 'general', costPer1M: 0.55 },
    { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', category: 'reasoning', costPer1M: 2.19 },
    { id: 'llama-3-405b', name: 'Llama 3.1 405B', provider: 'Meta', category: 'general', costPer1M: 5.00 },
    { id: 'llama-3-70b', name: 'Llama 3.3 70B', provider: 'Meta', category: 'general', costPer1M: 0.90 },
    { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral', category: 'general', costPer1M: 8.00 },
];

// Sample benchmarks to pre-seed
const DEFAULT_BENCHMARKS = [
    { id: 'b1', modelId: 'claude-opus-4', task: 'reasoning', success: true, quality: 9.5, responseTime: 8.2, tokens: 2500, notes: 'Complex multi-step problem', date: '2026-01-28' },
    { id: 'b2', modelId: 'claude-opus-4', task: 'coding', success: true, quality: 9.2, responseTime: 6.5, tokens: 1800, notes: 'Algorithm implementation', date: '2026-01-29' },
    { id: 'b3', modelId: 'claude-sonnet-4', task: 'general', success: true, quality: 8.8, responseTime: 2.1, tokens: 1200, notes: 'General Q&A', date: '2026-01-28' },
    { id: 'b4', modelId: 'claude-sonnet-4', task: 'coding', success: true, quality: 8.5, responseTime: 2.8, tokens: 1500, notes: 'Code review', date: '2026-01-30' },
    { id: 'b5', modelId: 'gpt-4o', task: 'general', success: true, quality: 8.6, responseTime: 1.8, tokens: 1100, notes: 'Summarization task', date: '2026-01-28' },
    { id: 'b6', modelId: 'gpt-4o', task: 'creative', success: true, quality: 8.9, responseTime: 2.5, tokens: 1400, notes: 'Story writing', date: '2026-01-29' },
    { id: 'b7', modelId: 'gpt-4-turbo', task: 'reasoning', success: true, quality: 8.4, responseTime: 4.2, tokens: 2000, notes: 'Logic puzzle', date: '2026-01-27' },
    { id: 'b8', modelId: 'gpt-4o-mini', task: 'general', success: true, quality: 7.5, responseTime: 0.8, tokens: 800, notes: 'Quick lookup', date: '2026-01-30' },
    { id: 'b9', modelId: 'o1', task: 'reasoning', success: true, quality: 9.7, responseTime: 45.0, tokens: 8000, notes: 'Complex math proof', date: '2026-01-29' },
    { id: 'b10', modelId: 'gemini-2-pro', task: 'general', success: true, quality: 8.5, responseTime: 2.0, tokens: 1300, notes: 'Research synthesis', date: '2026-01-28' },
    { id: 'b11', modelId: 'gemini-2-flash', task: 'general', success: true, quality: 7.8, responseTime: 0.5, tokens: 600, notes: 'Fast response test', date: '2026-01-30' },
    { id: 'b12', modelId: 'deepseek-v3', task: 'coding', success: true, quality: 8.7, responseTime: 3.1, tokens: 1700, notes: 'Code generation', date: '2026-01-29' },
    { id: 'b13', modelId: 'deepseek-r1', task: 'reasoning', success: true, quality: 9.3, responseTime: 25.0, tokens: 5000, notes: 'Chain of thought reasoning', date: '2026-01-30' },
    { id: 'b14', modelId: 'claude-haiku-35', task: 'general', success: true, quality: 7.9, responseTime: 0.4, tokens: 500, notes: 'Quick classification', date: '2026-01-30' },
    { id: 'b15', modelId: 'llama-3-70b', task: 'general', success: true, quality: 8.0, responseTime: 1.5, tokens: 900, notes: 'Open source comparison', date: '2026-01-29' },
];

// App State
let state = {
    models: [],
    benchmarks: []
};

// Charts
let charts = {};

// Initialize app
function init() {
    loadData();
    setupEventListeners();
    renderDashboard();
    renderModels();
    populateSelects();
}

// Load data from localStorage or use defaults
function loadData() {
    const savedData = localStorage.getItem('modelTrackerData');
    if (savedData) {
        state = JSON.parse(savedData);
    } else {
        state.models = [...DEFAULT_MODELS];
        state.benchmarks = [...DEFAULT_BENCHMARKS];
        saveData();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('modelTrackerData', JSON.stringify(state));
}

// Setup event listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Export/Import
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
    document.getElementById('importFile').addEventListener('change', importData);

    // Add model
    document.getElementById('addModelBtn').addEventListener('click', () => showModal('addModelModal'));
    document.getElementById('cancelModel').addEventListener('click', () => hideModal('addModelModal'));
    document.getElementById('addModelForm').addEventListener('submit', addModel);

    // Compare
    document.getElementById('compareBtn').addEventListener('click', compareModels);

    // Recommendations
    document.getElementById('getRecommendation').addEventListener('click', getRecommendation);

    // Benchmark form
    document.getElementById('benchmarkForm').addEventListener('submit', addBenchmark);

    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal(modal.id);
        });
    });
}

// Tab switching
function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');

    // Refresh content when switching
    if (tabId === 'dashboard') renderDashboard();
    if (tabId === 'models') renderModels();
}

// Dashboard rendering
function renderDashboard() {
    updateStats();
    renderCharts();
}

function updateStats() {
    document.getElementById('totalModels').textContent = state.models.length;
    document.getElementById('totalBenchmarks').textContent = state.benchmarks.length;
    
    const avgSuccess = state.benchmarks.length > 0
        ? Math.round((state.benchmarks.filter(b => b.success).length / state.benchmarks.length) * 100)
        : 0;
    document.getElementById('avgSuccess').textContent = avgSuccess + '%';

    // Find top model by average quality
    const topModel = getTopModel();
    document.getElementById('topModel').textContent = topModel ? topModel.name : '-';
}

function getTopModel() {
    const modelStats = {};
    state.benchmarks.forEach(b => {
        if (!modelStats[b.modelId]) {
            modelStats[b.modelId] = { total: 0, quality: 0 };
        }
        modelStats[b.modelId].total++;
        modelStats[b.modelId].quality += b.quality;
    });

    let topId = null;
    let topAvg = 0;
    Object.entries(modelStats).forEach(([id, stats]) => {
        const avg = stats.quality / stats.total;
        if (avg > topAvg) {
            topAvg = avg;
            topId = id;
        }
    });

    return state.models.find(m => m.id === topId);
}

function renderCharts() {
    renderSuccessChart();
    renderCostQualityChart();
    renderTimeChart();
    renderQualityChart();
}

function getModelStats() {
    const stats = {};
    state.models.forEach(m => {
        stats[m.id] = {
            name: m.name,
            benchmarks: 0,
            successes: 0,
            totalQuality: 0,
            totalTime: 0,
            totalTokens: 0,
            cost: m.costPer1M
        };
    });

    state.benchmarks.forEach(b => {
        if (stats[b.modelId]) {
            stats[b.modelId].benchmarks++;
            if (b.success) stats[b.modelId].successes++;
            stats[b.modelId].totalQuality += b.quality;
            stats[b.modelId].totalTime += b.responseTime;
            stats[b.modelId].totalTokens += b.tokens || 0;
        }
    });

    return Object.values(stats).filter(s => s.benchmarks > 0);
}

function renderSuccessChart() {
    const ctx = document.getElementById('successChart').getContext('2d');
    const stats = getModelStats();

    if (charts.success) charts.success.destroy();
    
    charts.success = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stats.map(s => s.name),
            datasets: [{
                label: 'Success Rate %',
                data: stats.map(s => Math.round((s.successes / s.benchmarks) * 100)),
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 100, grid: { color: '#2d2d44' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function renderCostQualityChart() {
    const ctx = document.getElementById('costQualityChart').getContext('2d');
    const stats = getModelStats();

    if (charts.costQuality) charts.costQuality.destroy();

    charts.costQuality = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Cost vs Quality',
                data: stats.map(s => ({
                    x: s.cost,
                    y: s.totalQuality / s.benchmarks,
                    label: s.name
                })),
                backgroundColor: 'rgba(139, 92, 246, 0.7)',
                borderColor: 'rgba(139, 92, 246, 1)',
                pointRadius: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const point = ctx.raw;
                            return `${point.label}: $${point.x}/1M tokens, Quality: ${point.y.toFixed(1)}`;
                        }
                    }
                }
            },
            scales: {
                x: { 
                    title: { display: true, text: 'Cost ($/1M tokens)', color: '#a0a0b0' },
                    grid: { color: '#2d2d44' }
                },
                y: { 
                    title: { display: true, text: 'Avg Quality Score', color: '#a0a0b0' },
                    grid: { color: '#2d2d44' },
                    min: 0, max: 10
                }
            }
        }
    });
}

function renderTimeChart() {
    const ctx = document.getElementById('timeChart').getContext('2d');
    const stats = getModelStats();

    if (charts.time) charts.time.destroy();

    charts.time = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stats.map(s => s.name),
            datasets: [{
                label: 'Avg Response Time (s)',
                data: stats.map(s => (s.totalTime / s.benchmarks).toFixed(2)),
                backgroundColor: 'rgba(34, 197, 94, 0.7)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: {
                x: { beginAtZero: true, grid: { color: '#2d2d44' } },
                y: { grid: { display: false } }
            }
        }
    });
}

function renderQualityChart() {
    const ctx = document.getElementById('qualityChart').getContext('2d');
    const stats = getModelStats();

    if (charts.quality) charts.quality.destroy();

    charts.quality = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: stats.slice(0, 6).map(s => s.name),
            datasets: [{
                label: 'Quality Score',
                data: stats.slice(0, 6).map(s => (s.totalQuality / s.benchmarks).toFixed(1)),
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                pointBackgroundColor: 'rgba(99, 102, 241, 1)'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    grid: { color: '#2d2d44' },
                    angleLines: { color: '#2d2d44' },
                    pointLabels: { color: '#a0a0b0' }
                }
            }
        }
    });
}

// Models rendering
function renderModels() {
    const container = document.getElementById('modelsList');
    container.innerHTML = state.models.map(model => {
        const benchmarks = state.benchmarks.filter(b => b.modelId === model.id);
        const successRate = benchmarks.length > 0 
            ? Math.round((benchmarks.filter(b => b.success).length / benchmarks.length) * 100)
            : 0;
        const avgQuality = benchmarks.length > 0
            ? (benchmarks.reduce((sum, b) => sum + b.quality, 0) / benchmarks.length).toFixed(1)
            : '-';
        const avgTime = benchmarks.length > 0
            ? (benchmarks.reduce((sum, b) => sum + b.responseTime, 0) / benchmarks.length).toFixed(1)
            : '-';

        const categoryEmoji = {
            general: '🎯',
            coding: '💻',
            reasoning: '🧠',
            creative: '🎨',
            fast: '⚡'
        };

        return `
            <div class="model-card">
                <h3>${categoryEmoji[model.category] || '🤖'} ${model.name}</h3>
                <p class="model-provider">${model.provider}</p>
                <div class="model-stats">
                    <div class="model-stat">
                        <div class="model-stat-value">${successRate}%</div>
                        <div class="model-stat-label">Success Rate</div>
                    </div>
                    <div class="model-stat">
                        <div class="model-stat-value">${avgQuality}</div>
                        <div class="model-stat-label">Avg Quality</div>
                    </div>
                    <div class="model-stat">
                        <div class="model-stat-value">${avgTime}s</div>
                        <div class="model-stat-label">Avg Time</div>
                    </div>
                    <div class="model-stat">
                        <div class="model-stat-value">$${model.costPer1M}</div>
                        <div class="model-stat-label">$/1M tokens</div>
                    </div>
                </div>
                <span class="model-category">${model.category}</span>
                <button class="delete-model" onclick="deleteModel('${model.id}')">🗑️ Delete</button>
            </div>
        `;
    }).join('');
}

// Add model
function addModel(e) {
    e.preventDefault();
    const model = {
        id: 'model-' + Date.now(),
        name: document.getElementById('modelName').value,
        provider: document.getElementById('modelProvider').value,
        category: document.getElementById('modelCategory').value,
        costPer1M: parseFloat(document.getElementById('modelCost').value) || 0
    };
    
    state.models.push(model);
    saveData();
    renderModels();
    populateSelects();
    hideModal('addModelModal');
    document.getElementById('addModelForm').reset();
    showToast('Model added successfully!', 'success');
}

// Delete model
function deleteModel(id) {
    if (!confirm('Delete this model and all its benchmarks?')) return;
    state.models = state.models.filter(m => m.id !== id);
    state.benchmarks = state.benchmarks.filter(b => b.modelId !== id);
    saveData();
    renderModels();
    renderDashboard();
    populateSelects();
    showToast('Model deleted', 'success');
}

// Populate selects
function populateSelects() {
    const selects = ['benchModel', 'compareModel1', 'compareModel2'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select model...</option>' +
            state.models.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
        select.value = currentValue;
    });
}

// Add benchmark
function addBenchmark(e) {
    e.preventDefault();
    const benchmark = {
        id: 'bench-' + Date.now(),
        modelId: document.getElementById('benchModel').value,
        task: document.getElementById('benchTask').value,
        success: document.getElementById('benchSuccess').value === 'true',
        quality: parseFloat(document.getElementById('benchQuality').value),
        responseTime: parseFloat(document.getElementById('benchTime').value),
        tokens: parseInt(document.getElementById('benchTokens').value) || 0,
        notes: document.getElementById('benchNotes').value,
        date: new Date().toISOString().split('T')[0]
    };

    state.benchmarks.push(benchmark);
    saveData();
    document.getElementById('benchmarkForm').reset();
    showToast('Benchmark saved!', 'success');
    switchTab('dashboard');
}

// Compare models
function compareModels() {
    const id1 = document.getElementById('compareModel1').value;
    const id2 = document.getElementById('compareModel2').value;

    if (!id1 || !id2) {
        showToast('Please select two models to compare', 'error');
        return;
    }

    const model1 = state.models.find(m => m.id === id1);
    const model2 = state.models.find(m => m.id === id2);
    const bench1 = state.benchmarks.filter(b => b.modelId === id1);
    const bench2 = state.benchmarks.filter(b => b.modelId === id2);

    const getStats = (benchmarks, model) => ({
        name: model.name,
        successRate: benchmarks.length > 0 
            ? Math.round((benchmarks.filter(b => b.success).length / benchmarks.length) * 100)
            : 0,
        avgQuality: benchmarks.length > 0
            ? (benchmarks.reduce((sum, b) => sum + b.quality, 0) / benchmarks.length).toFixed(1)
            : 0,
        avgTime: benchmarks.length > 0
            ? (benchmarks.reduce((sum, b) => sum + b.responseTime, 0) / benchmarks.length).toFixed(1)
            : 0,
        cost: model.costPer1M,
        benchmarks: benchmarks.length
    });

    const stats1 = getStats(bench1, model1);
    const stats2 = getStats(bench2, model2);

    const metrics = [
        { label: 'Success Rate', key: 'successRate', unit: '%', higher: true },
        { label: 'Avg Quality', key: 'avgQuality', unit: '', higher: true },
        { label: 'Avg Response Time', key: 'avgTime', unit: 's', higher: false },
        { label: 'Cost per 1M tokens', key: 'cost', unit: '$', higher: false },
        { label: 'Total Benchmarks', key: 'benchmarks', unit: '', higher: true }
    ];

    const renderCard = (stats, otherStats) => {
        return `
            <div class="comparison-card">
                <h3>${stats.name}</h3>
                ${metrics.map(m => {
                    const val = parseFloat(stats[m.key]);
                    const otherVal = parseFloat(otherStats[m.key]);
                    const isWinner = m.higher ? val > otherVal : val < otherVal;
                    const isLoser = m.higher ? val < otherVal : val > otherVal;
                    return `
                        <div class="comparison-metric">
                            <span class="metric-label">${m.label}</span>
                            <span class="metric-value ${isWinner ? 'winner' : ''} ${isLoser ? 'loser' : ''}">
                                ${m.unit === '$' ? '$' : ''}${stats[m.key]}${m.unit !== '$' ? m.unit : ''}
                            </span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    };

    document.getElementById('comparisonResult').innerHTML = 
        renderCard(stats1, stats2) + renderCard(stats2, stats1);
}

// Get recommendation
function getRecommendation() {
    const useCase = document.getElementById('useCase').value;
    if (!useCase) {
        showToast('Please select a use case', 'error');
        return;
    }

    const modelScores = state.models.map(model => {
        const benchmarks = state.benchmarks.filter(b => b.modelId === model.id);
        if (benchmarks.length === 0) return { model, score: 0, reason: 'No benchmark data' };

        const successRate = benchmarks.filter(b => b.success).length / benchmarks.length;
        const avgQuality = benchmarks.reduce((sum, b) => sum + b.quality, 0) / benchmarks.length;
        const avgTime = benchmarks.reduce((sum, b) => sum + b.responseTime, 0) / benchmarks.length;
        const cost = model.costPer1M;

        let score = 0;
        let reason = '';

        switch (useCase) {
            case 'coding':
                score = (model.category === 'coding' ? 20 : 0) + avgQuality * 8 + successRate * 10;
                reason = 'Optimized for code generation, debugging, and technical tasks';
                break;
            case 'reasoning':
                score = (model.category === 'reasoning' ? 25 : 0) + avgQuality * 10;
                reason = 'Excels at complex multi-step reasoning and analysis';
                break;
            case 'creative':
                score = (model.category === 'creative' ? 20 : 0) + avgQuality * 9;
                reason = 'Great for creative writing, brainstorming, and content creation';
                break;
            case 'fast':
                score = (100 / (avgTime + 1)) * 2 + (model.category === 'fast' ? 30 : 0);
                reason = 'Optimized for low latency and quick responses';
                break;
            case 'budget':
                score = (100 / (cost + 1)) * 5 + avgQuality * 3;
                reason = 'Best value for money without sacrificing too much quality';
                break;
            case 'quality':
                score = avgQuality * 12 + successRate * 15;
                reason = 'Highest quality outputs regardless of cost or speed';
                break;
        }

        return {
            model,
            score,
            reason,
            stats: { successRate: Math.round(successRate * 100), avgQuality: avgQuality.toFixed(1), avgTime: avgTime.toFixed(1), cost }
        };
    }).filter(m => m.score > 0).sort((a, b) => b.score - a.score);

    if (modelScores.length === 0) {
        document.getElementById('recommendationResult').innerHTML = 
            '<div class="recommendation-card empty">No models with benchmark data available.</div>';
        return;
    }

    const top = modelScores[0];
    const alternatives = modelScores.slice(1, 4);

    document.getElementById('recommendationResult').innerHTML = `
        <div class="recommendation-card">
            <div class="recommendation-header">
                <h3>🏆 ${top.model.name}</h3>
                <p>${top.model.provider}</p>
            </div>
            <div class="recommendation-body">
                <div class="recommendation-stats">
                    <div class="rec-stat">
                        <div class="rec-stat-value">${top.stats.successRate}%</div>
                        <div class="rec-stat-label">Success Rate</div>
                    </div>
                    <div class="rec-stat">
                        <div class="rec-stat-value">${top.stats.avgQuality}</div>
                        <div class="rec-stat-label">Avg Quality</div>
                    </div>
                    <div class="rec-stat">
                        <div class="rec-stat-value">${top.stats.avgTime}s</div>
                        <div class="rec-stat-label">Avg Time</div>
                    </div>
                    <div class="rec-stat">
                        <div class="rec-stat-value">$${top.stats.cost}</div>
                        <div class="rec-stat-label">$/1M tokens</div>
                    </div>
                </div>
                <div class="recommendation-reason">
                    <h4>💡 Why this model?</h4>
                    <p>${top.reason}</p>
                </div>
                ${alternatives.length > 0 ? `
                    <div class="alternatives">
                        <h4>Also consider:</h4>
                        <div class="alt-models">
                            ${alternatives.map(a => `<span class="alt-model">${a.model.name}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Export data
function exportData() {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `model-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported!', 'success');
}

// Import data
function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            if (imported.models && imported.benchmarks) {
                state = imported;
                saveData();
                renderDashboard();
                renderModels();
                populateSelects();
                showToast('Data imported successfully!', 'success');
            } else {
                throw new Error('Invalid format');
            }
        } catch (err) {
            showToast('Invalid file format', 'error');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

// Modal helpers
function showModal(id) {
    document.getElementById(id).classList.add('active');
}

function hideModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Global function for delete button
window.deleteModel = deleteModel;

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
