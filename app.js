// --------------------------------------------------------------------------
// RH Manager Pro - Interactive Web Application Logic
// --------------------------------------------------------------------------

// Initial Seed Data (Realistic Algerian Company Records)
const INITIAL_EMPLOYEES = [
    { id: '101', matricule: '101', name: 'Karim Benali', role: 'Directeur Technique', phone: '0550123456', start: '2022-01-15', duration: 'CDI', status: 'actif', salary: 145000 },
    { id: '102', matricule: '102', name: 'Yasmine Amrani', role: 'Responsable RH', phone: '0661987654', start: '2022-03-01', duration: 'CDI', status: 'actif', salary: 110000 },
    { id: '103', matricule: '103', name: 'Mohamed Saidi', role: 'Ingénieur Système', phone: '0770456789', start: '2023-06-15', duration: '1 an', status: 'actif', salary: 95000 },
    { id: '104', matricule: '104', name: 'Sofia Boudiaf', role: 'Comptable Senior', phone: '0552345678', start: '2023-01-10', duration: 'CDI', status: 'conge', salary: 88000 },
    { id: '105', matricule: '105', name: 'Amine Khelifi', role: 'Développeur FullStack', phone: '0663456789', start: '2024-02-01', duration: '6 mois', status: 'actif', salary: 90000 },
    { id: '106', matricule: '106', name: 'Nadia Meziani', role: 'Designer UX/UI', phone: '0771567890', start: '2024-04-15', duration: 'CDI', status: 'actif', salary: 82000 },
    { id: '107', matricule: '107', name: 'Khaled Dahmani', role: 'Technicien Réseau', phone: '0554678901', start: '2023-09-01', duration: '1 an', status: 'maladie', salary: 65000 },
    { id: '108', matricule: '108', name: 'Lyna Cherif', role: 'Assistante de Direction', phone: '0665789012', start: '2022-11-01', duration: 'CDI', status: 'actif', salary: 70000 },
    { id: '109', matricule: '109', name: 'Billel Ouali', role: 'Chef de Projet IT', phone: '0772890123', start: '2021-08-15', duration: 'CDI', status: 'actif', salary: 130000 },
    { id: '110', matricule: '110', name: 'Meriem Hadj', role: 'Spécialiste Marketing', phone: '0555901234', start: '2024-01-05', duration: '6 mois', status: 'actif', salary: 75000 }
];

const INITIAL_LEAVES = [
    { id: 'l1', matricule: '104', name: 'Sofia Boudiaf', type: 'Congé Annuel', start: '2026-08-10', end: '2026-08-25', days: 15, status: 'Actif' },
    { id: 'l2', matricule: '107', name: 'Khaled Dahmani', type: 'Maladie', start: '2026-08-14', end: '2026-08-21', days: 7, status: 'Actif' },
    { id: 'l3', matricule: '102', name: 'Yasmine Amrani', type: 'Événement Familial', start: '2026-07-01', end: '2026-07-04', days: 3, status: 'Terminé' },
    { id: 'l4', matricule: '105', name: 'Amine Khelifi', type: 'Congé Annuel', start: '2026-06-15', end: '2026-06-30', days: 15, status: 'Terminé' }
];

const INITIAL_DAILY_LOGS = [
    { id: 'd1', matricule: '103', name: 'Mohamed Saidi', date: '2026-08-14', type: 'Retard', minutes: 25, reason: 'Embouteillages autoroute' },
    { id: 'd2', matricule: '105', name: 'Amine Khelifi', date: '2026-08-12', type: 'Retard', minutes: 40, reason: 'Panne de véhicule' },
    { id: 'd3', matricule: '107', name: 'Khaled Dahmani', date: '2026-08-10', type: 'Absence Injustifiée', minutes: 480, reason: 'Non justifié' }
];

const INITIAL_ZK_LOGS = [
    { id: 'zk1', time: '2026-08-15 07:54:12', matricule: '101', name: 'Karim Benali', method: 'Facial', action: 'ENTREE', status: 'À l\'heure' },
    { id: 'zk2', time: '2026-08-15 08:02:45', matricule: '102', name: 'Yasmine Amrani', method: 'Fingerprint', action: 'ENTREE', status: 'À l\'heure' },
    { id: 'zk3', time: '2026-08-15 08:24:10', matricule: '103', name: 'Mohamed Saidi', method: 'Fingerprint', action: 'ENTREE', status: 'Retard (24m)' },
    { id: 'zk4', time: '2026-08-15 08:05:30', matricule: '105', name: 'Amine Khelifi', method: 'RFID Card', action: 'ENTREE', status: 'À l\'heure' },
    { id: 'zk5', time: '2026-08-15 08:12:00', matricule: '108', name: 'Lyna Cherif', method: 'Facial', action: 'ENTREE', status: 'Retard (12m)' }
];

const DEFAULT_COMPANY = {
    name: 'ENTREPRISE RH MANAGER SARL',
    address: 'Zone Industrielle Chéraga, Alger, Algérie',
    nif: 'NIF: 001916019283746 | NIS: 198273645',
    logo: ''
};

// App State Management
class RHManagerApp {
    constructor() {
        this.employees = JSON.parse(localStorage.getItem('rh_employees')) || INITIAL_EMPLOYEES;
        this.leaves = JSON.parse(localStorage.getItem('rh_leaves')) || INITIAL_LEAVES;
        this.dailyLogs = JSON.parse(localStorage.getItem('rh_daily_logs')) || INITIAL_DAILY_LOGS;
        this.zkLogs = JSON.parse(localStorage.getItem('rh_zk_logs')) || INITIAL_ZK_LOGS;
        this.company = JSON.parse(localStorage.getItem('rh_company')) || DEFAULT_COMPANY;
        this.charts = {};
        
        this.initDOM();
        this.initEvents();
        this.renderAll();
    }

    saveState() {
        localStorage.setItem('rh_employees', JSON.stringify(this.employees));
        localStorage.setItem('rh_leaves', JSON.stringify(this.leaves));
        localStorage.setItem('rh_daily_logs', JSON.stringify(this.dailyLogs));
        localStorage.setItem('rh_zk_logs', JSON.stringify(this.zkLogs));
        localStorage.setItem('rh_company', JSON.stringify(this.company));
    }

    initDOM() {
        // Tab elements
        this.navLinks = document.querySelectorAll('.nav-link');
        this.tabPanels = document.querySelectorAll('.tab-panel');
        
        // Modals
        this.modalEmp = document.getElementById('modal-employee');
        this.modalPayslip = document.getElementById('modal-payslip');
        this.modalLogo = document.getElementById('modal-company-logo');
        
        // KPI elements
        this.kpiTotal = document.getElementById('kpi-total-emp');
        this.kpiActive = document.getElementById('kpi-active-emp');
        this.kpiLeave = document.getElementById('kpi-on-leave');
        this.kpiPayroll = document.getElementById('kpi-payroll');
        
        // Tables
        this.tableEmp = document.getElementById('table-employees').querySelector('tbody');
        this.tableDashLeaves = document.getElementById('table-dashboard-leaves').querySelector('tbody');
        this.tableLeavesHist = document.getElementById('table-leaves-history').querySelector('tbody');
        this.tableDailyLog = document.getElementById('table-daily-log') ? document.getElementById('table-daily-log').querySelector('tbody') : null;
        this.tableMonthlySummary = document.getElementById('table-monthly-summary') ? document.getElementById('table-monthly-summary').querySelector('tbody') : null;
        this.tableZK = document.getElementById('table-zk-logs') ? document.getElementById('table-zk-logs').querySelector('tbody') : null;
        this.tablePayroll = document.getElementById('table-payroll-summary').querySelector('tbody');
    }

    initEvents() {
        // Tab switching
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = link.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });

        // Keyboard Shortcut: Ctrl + K for Smart Search, Escape to close modals
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('global-search');
                if (searchInput) searchInput.focus();
            }
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(modal => this.closeModal(modal));
            }
        });

        // Close modal when clicking backdrop outside container
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal(overlay);
                }
            });
        });

        // Subtabs switching (Leaves & Finance)
        document.querySelectorAll('.subtab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subtabId = btn.getAttribute('data-subtab');
                const parentPanel = btn.closest('.tab-panel');
                parentPanel.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
                parentPanel.querySelectorAll('.subtab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const targetContent = document.getElementById(`subtab-${subtabId}`);
                if (targetContent) targetContent.classList.add('active');
            });
        });

        // Smart Global Search
        document.getElementById('global-search').addEventListener('input', (e) => {
            this.handleGlobalSearch(e.target.value.toLowerCase().trim());
        });

        // Company Logo & Header Modal
        const companyLogoBtn = document.getElementById('company-logo-btn');
        if (companyLogoBtn) {
            companyLogoBtn.addEventListener('click', () => this.openLogoModal());
        }
        const modalLogoClose = document.getElementById('modal-logo-close');
        if (modalLogoClose) modalLogoClose.addEventListener('click', () => this.closeModal(this.modalLogo));
        const modalLogoCancel = document.getElementById('modal-logo-cancel');
        if (modalLogoCancel) modalLogoCancel.addEventListener('click', () => this.closeModal(this.modalLogo));

        const logoForm = document.getElementById('company-logo-form');
        if (logoForm) {
            logoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSaveCompanySettings();
            });
        }

        const logoFile = document.getElementById('company-logo-file');
        if (logoFile) {
            logoFile.addEventListener('change', (e) => this.handleLogoFileUpload(e));
        }

        const logoUrlInput = document.getElementById('company-logo-url');
        if (logoUrlInput) {
            logoUrlInput.addEventListener('input', (e) => this.handleLogoUrlInput(e.target.value.trim()));
        }

        // ZKTeco Biometric Handlers
        const zkForm = document.getElementById('zk-punch-form');
        if (zkForm) {
            zkForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSaveZKPunch();
            });
        }
        const zkSyncBtn = document.getElementById('zk-sync-now-btn');
        if (zkSyncBtn) zkSyncBtn.addEventListener('click', () => this.syncZKTecoDevice());

        const zkImportBtn = document.getElementById('zk-import-file-btn');
        if (zkImportBtn) zkImportBtn.addEventListener('click', () => this.importZKTecoFile());

        // Quick Add Employee buttons
        document.getElementById('quick-add-emp-btn').addEventListener('click', () => this.openEmployeeModal());
        document.getElementById('add-emp-btn').addEventListener('click', () => this.openEmployeeModal());
        
        // Modal cancel/close
        const empClose = document.getElementById('modal-emp-close');
        if (empClose) empClose.addEventListener('click', () => this.closeModal(this.modalEmp));
        const empCancel = document.getElementById('modal-emp-cancel');
        if (empCancel) empCancel.addEventListener('click', () => this.closeModal(this.modalEmp));
        
        const payslipClose = document.getElementById('modal-payslip-close');
        if (payslipClose) payslipClose.addEventListener('click', () => this.closeModal(this.modalPayslip));
        const payslipCloseBtn = document.getElementById('modal-payslip-close-btn');
        if (payslipCloseBtn) payslipCloseBtn.addEventListener('click', () => this.closeModal(this.modalPayslip));

        // Employee Form Submit
        document.getElementById('employee-modal-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSaveEmployee();
        });

        // Leave Form Submit
        document.getElementById('leave-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSaveLeave();
        });

        // Daily Attendance Form Submit
        const dailyForm = document.getElementById('daily-attendance-form');
        if (dailyForm) {
            dailyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSaveDailyLog();
            });
        }

        // Leave duration date auto-calculator
        document.getElementById('leave-start-date').addEventListener('change', () => this.calcLeaveEnd());
        document.getElementById('leave-days').addEventListener('input', () => this.calcLeaveEnd());

        // Payroll calculator
        document.getElementById('pay-emp-select').addEventListener('change', (e) => this.updatePayrollCalc(e.target.value));
        document.getElementById('pay-base').addEventListener('input', () => this.calcPayrollNet());
        document.getElementById('pay-trans').addEventListener('input', () => this.calcPayrollNet());
        document.getElementById('pay-panier').addEventListener('input', () => this.calcPayrollNet());
        document.getElementById('generate-payslip-btn').addEventListener('click', () => this.generatePayslipModal());

        // Document type selector change (shows mission order extra fields)
        const docTypeSelect = document.getElementById('doc-type-select');
        if (docTypeSelect) {
            docTypeSelect.addEventListener('change', (e) => {
                const missionFields = document.getElementById('doc-mission-fields');
                if (missionFields) {
                    missionFields.style.display = (e.target.value === 'ordre_mission') ? 'block' : 'none';
                }
            });
        }

        // Official Document Generator
        const genDocBtn = document.getElementById('generate-doc-btn');
        if (genDocBtn) {
            genDocBtn.addEventListener('click', () => this.generateOfficialDocumentModal());
        }

        // Settings Tab Form
        const settingsForm = document.getElementById('settings-tab-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSaveSettingsTab();
            });
        }

        const settingsLogoFile = document.getElementById('settings-company-logo-file');
        if (settingsLogoFile) {
            settingsLogoFile.addEventListener('change', (e) => this.handleLogoFileUpload(e));
        }

        const settingsLogoUrl = document.getElementById('settings-company-logo-url');
        if (settingsLogoUrl) {
            settingsLogoUrl.addEventListener('input', (e) => this.handleLogoUrlInput(e.target.value.trim()));
        }

        // CSV / Excel Export Buttons
        const expEmpExcel = document.getElementById('export-emp-excel');
        if (expEmpExcel) expEmpExcel.addEventListener('click', () => this.exportToCSV(this.employees, 'employes_rh_manager.csv'));

        const expLeavesCsv = document.getElementById('export-leaves-csv');
        if (expLeavesCsv) expLeavesCsv.addEventListener('click', () => this.exportToCSV(this.leaves, 'conges_rh_manager.csv'));

        const expBilanBtn = document.getElementById('export-bilan-btn');
        if (expBilanBtn) expBilanBtn.addEventListener('click', () => this.exportBilanCSV());

        // Filter buttons in Employee Directory
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderEmployeesTable(btn.getAttribute('data-filter'));
            });
        });

        // WhatsApp messaging generator
        document.getElementById('wa-emp-select').addEventListener('change', () => this.updateWhatsAppPreview());
        document.getElementById('wa-template-select').addEventListener('change', () => this.updateWhatsAppPreview());
        document.getElementById('send-wa-btn').addEventListener('click', () => this.sendWhatsAppMessage());

        // Outlook simulator
        document.getElementById('send-outlook-btn').addEventListener('click', () => {
            this.showToast('Email Outlook simulé avec succès !', 'success');
        });

        // Reset Demo Data
        document.getElementById('reset-demo-btn').addEventListener('click', () => {
            if (confirm('Voulez-vous réinitialiser toutes les données de démonstration ?')) {
                localStorage.clear();
                this.employees = INITIAL_EMPLOYEES;
                this.leaves = INITIAL_LEAVES;
                this.dailyLogs = INITIAL_DAILY_LOGS;
                this.saveState();
                this.renderAll();
                this.showToast('Données réinitialisées.', 'info');
            }
        });

        // Mobile hamburger menu toggle
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const sidebar = document.getElementById('sidebar');
        if (mobileBtn && sidebar) {
            mobileBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
            // Close sidebar when clicking a nav link on mobile
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('open');
                    }
                });
            });
        }
    }

    switchTab(tabId) {
        this.navLinks.forEach(l => l.classList.remove('active'));
        this.tabPanels.forEach(p => p.classList.remove('active'));

        const targetLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
        const targetPanel = document.getElementById(`tab-${tabId}`);

        if (targetLink && targetPanel) {
            targetLink.classList.add('active');
            targetPanel.classList.add('active');
            
            // Update Page Titles
            const titles = {
                'dashboard': 'Tableau de Bord RH',
                'employees': 'Répertoire des Employés',
                'leaves': 'Gestion des Congés & Absences',
                'zkteco': 'Gestion Pointeuse Biométrique ZKTeco',
                'analytics': 'Statistiques & Bilan RH',
                'finance': 'Finance & Fiches de Paye',
                'documents': 'Générateur de Documents RH & Papers Administrative',
                'settings': 'Configuration de l\'Entreprise & Logo',
                'whatsapp': 'Centre de Notifications WhatsApp',
                'outlook': 'Intégration Microsoft Outlook'
            };
            document.getElementById('page-title').textContent = titles[tabId] || 'RH Manager';
            
            // Lazy chart re-render
            if (tabId === 'analytics' || tabId === 'dashboard') {
                setTimeout(() => this.renderCharts(), 100);
            }
        }
    }

    renderAll() {
        this.updateKPIs();
        this.renderEmployeesTable('all');
        this.renderDashboardTables();
        this.renderLeavesTable();
        this.renderDailyLogsTable();
        this.renderMonthlySummaryTable();
        this.renderZKLogsTable();
        this.renderCompanyBrandingWidgets();
        this.populateDropdowns();
        this.renderPayrollTable();
        this.renderCharts();
    }

    updateKPIs() {
        const total = this.employees.length;
        const active = this.employees.filter(e => e.status === 'actif').length;
        const leave = this.employees.filter(e => e.status === 'conge' || e.status === 'maladie').length;
        
        const totalPayroll = this.employees.reduce((sum, e) => sum + (e.salary || 70000), 0);

        this.kpiTotal.textContent = total;
        this.kpiActive.textContent = active;
        this.kpiLeave.textContent = leave;
        this.kpiPayroll.textContent = totalPayroll.toLocaleString('fr-FR') + ' DZD';

        document.getElementById('emp-count-badge').textContent = total;
        document.getElementById('leave-count-badge').textContent = leave;
    }

    renderEmployeesTable(filter = 'all') {
        let list = this.employees;
        if (filter !== 'all') {
            list = list.filter(e => e.status === filter);
        }

        this.tableEmp.innerHTML = list.map(emp => `
            <tr>
                <td><strong>${emp.matricule}</strong></td>
                <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div class="avatar" style="width:30px; height:30px; font-size:10px; background:#1a73e8;">${emp.name.split(' ').map(n=>n[0]).join('')}</div>
                        <strong>${emp.name}</strong>
                    </div>
                </td>
                <td>${emp.role}</td>
                <td>${emp.phone}</td>
                <td>${emp.start}</td>
                <td><span class="badge-pro" style="background:#e2e8f0; color:#334155;">${emp.duration}</span></td>
                <td><span class="status-badge ${emp.status}">${emp.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn-icon" onclick="app.openEmployeeModal('${emp.id}')" title="Modifier"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon delete" onclick="app.deleteEmployee('${emp.id}')" title="Supprimer"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    renderDashboardTables() {
        // Recent leaves
        this.tableDashLeaves.innerHTML = this.leaves.slice(0, 5).map(l => `
            <tr>
                <td><strong>${l.name}</strong></td>
                <td>${l.type}</td>
                <td>${l.start}</td>
                <td>${l.end}</td>
                <td><span class="status-badge ${l.status === 'Actif' ? 'conge' : 'archive'}">${l.status}</span></td>
            </tr>
        `).join('');

        // Contract Alerts (CDDs)
        const cddEmps = this.employees.filter(e => e.duration !== 'CDI');
        document.getElementById('table-dashboard-contracts').querySelector('tbody').innerHTML = cddEmps.map(e => `
            <tr>
                <td><strong>${e.matricule}</strong></td>
                <td>${e.name}</td>
                <td><span style="color:#e67e22; font-weight:600;">CDD (${e.duration})</span></td>
                <td><button class="btn-secondary btn-sm" onclick="app.openEmployeeModal('${e.id}')">Renouveler</button></td>
            </tr>
        `).join('');
    }

    renderLeavesTable() {
        this.tableLeavesHist.innerHTML = this.leaves.map(l => `
            <tr>
                <td><strong>${l.matricule}</strong></td>
                <td>${l.name}</td>
                <td><span class="badge-pro" style="background:#eff6ff; color:#1d4ed8;">${l.type}</span></td>
                <td>${l.start}</td>
                <td>${l.end}</td>
                <td><strong>${l.days}j</strong></td>
                <td><button class="btn-icon delete" onclick="app.deleteLeave('${l.id}')"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `).join('');
    }

    renderDailyLogsTable() {
        if (!this.tableDailyLog) return;
        this.tableDailyLog.innerHTML = this.dailyLogs.map(d => `
            <tr>
                <td>${d.date}</td>
                <td><strong>${d.name}</strong> (${d.matricule})</td>
                <td><span class="status-badge ${d.type === 'Retard' ? 'conge' : 'maladie'}">${d.type}</span></td>
                <td><strong>${d.minutes} min</strong></td>
                <td>${d.reason || '-'}</td>
                <td><button class="btn-icon delete" onclick="app.deleteDailyLog('${d.id}')"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `).join('');
    }

    renderMonthlySummaryTable() {
        if (!this.tableMonthlySummary) return;
        this.tableMonthlySummary.innerHTML = this.employees.map(emp => {
            const empLogs = this.dailyLogs.filter(d => d.matricule === emp.matricule);
            const totalMins = empLogs.reduce((sum, d) => sum + (d.minutes || 0), 0);
            const retardsCount = empLogs.filter(d => d.type === 'Retard').length;
            const injustCount = empLogs.filter(d => d.type === 'Absence Injustifiée').length;
            
            // Hourly rate calculation approx: base / 173.33h
            const baseSalary = emp.salary || 75000;
            const hourlyRate = baseSalary / 173.33;
            const minsCost = (totalMins / 60) * hourlyRate;
            const injustCost = injustCount * (hourlyRate * 8);
            const totalDeduction = Math.round(minsCost + injustCost);

            return `
                <tr>
                    <td><strong>${emp.matricule}</strong></td>
                    <td>${emp.name}</td>
                    <td><strong style="color:${totalMins > 30 ? '#ef4444' : '#1e293b'};">${totalMins} min</strong></td>
                    <td><span class="badge-pro">${retardsCount}</span></td>
                    <td><span class="badge-pro" style="background:#fee2e2; color:#b91c1c;">${injustCount} j</span></td>
                    <td><strong style="color:#b91c1c;">${totalDeduction.toLocaleString()} DZD</strong></td>
                </tr>
            `;
        }).join('');
    }

    renderZKLogsTable() {
        if (!this.tableZK) return;
        const zkBadge = document.getElementById('zk-count-badge');
        if (zkBadge) zkBadge.textContent = `${this.zkLogs.length} pointages enregistrés`;

        this.tableZK.innerHTML = this.zkLogs.map(log => `
            <tr>
                <td><small>${log.time}</small></td>
                <td><strong>${log.name}</strong> (${log.matricule})</td>
                <td><span class="badge-pro" style="background:#f1f5f9; color:#475569;"><i class="fa-solid ${log.method === 'Facial' ? 'fa-user-check' : log.method === 'Fingerprint' ? 'fa-fingerprint' : 'fa-id-card'}"></i> ${log.method}</span></td>
                <td><span class="badge-pro" style="background:${log.action === 'ENTREE' ? '#ecfdf5' : '#fff7ed'}; color:${log.action === 'ENTREE' ? '#047857' : '#c2410c'};">${log.action}</span></td>
                <td><span class="status-badge ${log.status.includes('Retard') ? 'maladie' : 'actif'}">${log.status}</span></td>
            </tr>
        `).join('');
    }

    populateDropdowns() {
        const empOptions = this.employees.map(e => `<option value="${e.id}">${e.matricule} - ${e.name}</option>`).join('');
        
        const leaveSelect = document.getElementById('leave-emp-select');
        if (leaveSelect) leaveSelect.innerHTML = empOptions;

        const dailySelect = document.getElementById('daily-emp-select');
        if (dailySelect) dailySelect.innerHTML = empOptions;

        const zkSelect = document.getElementById('zk-emp-select');
        if (zkSelect) zkSelect.innerHTML = empOptions;

        const docSelect = document.getElementById('doc-emp-select');
        if (docSelect) docSelect.innerHTML = empOptions;

        const paySelect = document.getElementById('pay-emp-select');
        if (paySelect) paySelect.innerHTML = empOptions;

        const waSelect = document.getElementById('wa-emp-select');
        if (waSelect) waSelect.innerHTML = empOptions;
        
        if (this.employees.length > 0) {
            this.updatePayrollCalc(this.employees[0].id);
            this.updateWhatsAppPreview();
        }
    }

    renderPayrollTable() {
        this.tablePayroll.innerHTML = this.employees.map(e => {
            const base = e.salary || 70000;
            const net = Math.round(base * 0.85); // Approx Net
            return `
                <tr>
                    <td><strong>${e.matricule}</strong></td>
                    <td>${e.name}</td>
                    <td>${e.role}</td>
                    <td>${base.toLocaleString()} DZD</td>
                    <td><strong style="color:#059669;">${net.toLocaleString()} DZD</strong></td>
                </tr>
            `;
        }).join('');
    }

    // Modal Operations
    openEmployeeModal(empId = null) {
        const form = document.getElementById('employee-modal-form');
        form.reset();
        
        if (empId) {
            const emp = this.employees.find(e => e.id === empId);
            if (emp) {
                document.getElementById('modal-emp-title').textContent = 'Modifier l\'Employé';
                document.getElementById('emp-edit-id').value = emp.id;
                document.getElementById('emp-mat').value = emp.matricule;
                document.getElementById('emp-name').value = emp.name;
                document.getElementById('emp-role').value = emp.role;
                document.getElementById('emp-phone').value = emp.phone;
                document.getElementById('emp-start-date').value = emp.start;
                document.getElementById('emp-duration').value = emp.duration;
            }
        } else {
            document.getElementById('modal-emp-title').textContent = 'Ajouter un Employé';
            document.getElementById('emp-edit-id').value = '';
            document.getElementById('emp-mat').value = String(100 + this.employees.length + 1);
        }
        
        this.modalEmp.classList.add('active');
    }

    closeModal(modal) {
        modal.classList.remove('active');
    }

    handleSaveEmployee() {
        const id = document.getElementById('emp-edit-id').value;
        const mat = document.getElementById('emp-mat').value.trim();
        const name = document.getElementById('emp-name').value.trim();
        const role = document.getElementById('emp-role').value.trim();
        const phone = document.getElementById('emp-phone').value.trim();
        const start = document.getElementById('emp-start-date').value || new Date().toISOString().split('T')[0];
        const duration = document.getElementById('emp-duration').value;

        if (!mat || !name || !role) {
            this.showToast('Veuillez remplir les champs obligatoires.', 'error');
            return;
        }

        if (!id) {
            // Check duplicate matricule
            if (this.employees.some(e => e.matricule === mat)) {
                this.showToast(`Le matricule ${mat} existe déjà.`, 'error');
                return;
            }
            this.employees.push({
                id: 'emp_' + Date.now(),
                matricule: mat,
                name: name,
                role: role,
                phone: phone || '0550000000',
                start: start,
                duration: duration,
                status: 'actif',
                salary: 75000
            });
            this.showToast(`Employé ${name} ajouté avec succès !`, 'success');
        } else {
            const emp = this.employees.find(e => e.id === id);
            if (emp) {
                emp.matricule = mat;
                emp.name = name;
                emp.role = role;
                emp.phone = phone;
                emp.start = start;
                emp.duration = duration;
                this.showToast(`Fiche de ${name} mise à jour.`, 'success');
            }
        }

        this.saveState();
        this.renderAll();
        this.closeModal(this.modalEmp);
    }

    deleteEmployee(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
            this.employees = this.employees.filter(e => e.id !== id);
            this.saveState();
            this.renderAll();
            this.showToast('Employé supprimé.', 'info');
        }
    }

    calcLeaveEnd() {
        const startStr = document.getElementById('leave-start-date').value;
        const days = parseInt(document.getElementById('leave-days').value) || 1;
        if (startStr) {
            const startDate = new Date(startStr);
            startDate.setDate(startDate.getDate() + days - 1);
            document.getElementById('leave-end-date').value = startDate.toISOString().split('T')[0];
        }
    }

    handleSaveLeave() {
        const empId = document.getElementById('leave-emp-select').value;
        const type = document.getElementById('leave-type-select').value;
        const start = document.getElementById('leave-start-date').value;
        const days = parseInt(document.getElementById('leave-days').value) || 1;
        const end = document.getElementById('leave-end-date').value;

        const emp = this.employees.find(e => e.id === empId);
        if (!emp || !start) {
            this.showToast('Veuillez compléter le formulaire.', 'error');
            return;
        }

        // Overlap Check
        const hasOverlap = this.leaves.some(l => {
            if (l.matricule === emp.matricule) {
                return (start <= l.end && end >= l.start);
            }
            return false;
        });

        if (hasOverlap) {
            if (!confirm(`Un congé chevauchant existe déjà pour ${emp.name}.\nVoulez-vous quand même continuer ?`)) {
                return;
            }
        }

        this.leaves.unshift({
            id: 'l_' + Date.now(),
            matricule: emp.matricule,
            name: emp.name,
            type: type,
            start: start,
            end: end,
            days: days,
            status: 'Actif'
        });

        // Update emp status
        emp.status = (type === 'Maladie') ? 'maladie' : 'conge';

        this.saveState();
        this.renderAll();
        this.showToast(`Congé de ${emp.name} enregistré !`, 'success');
    }

    deleteLeave(id) {
        if (confirm('Voulez-vous annuler ce congé ?')) {
            this.leaves = this.leaves.filter(l => l.id !== id);
            this.saveState();
            this.renderAll();
            this.showToast('Congé retiré.', 'info');
        }
    }

    // Payroll Calculator Logic (Algeria Tax & Social Security)
    updatePayrollCalc(empId) {
        const emp = this.employees.find(e => e.id === empId);
        if (emp) {
            document.getElementById('pay-base').value = emp.salary || 75000;
            this.calcPayrollNet();
        }
    }

    calcPayrollNet() {
        const base = parseFloat(document.getElementById('pay-base').value) || 0;
        const trans = parseFloat(document.getElementById('pay-trans').value) || 0;
        const panier = parseFloat(document.getElementById('pay-panier').value) || 0;

        const cnas = Math.round(base * 0.09); // CNAS 9%
        document.getElementById('pay-cnas').value = cnas.toLocaleString() + ' DZD';

        const brut = base + trans + panier;
        const net = Math.round(brut - cnas - (base * 0.06)); // Net estimation
        document.getElementById('pay-net-result').textContent = net.toLocaleString('fr-FR') + ' DZD';
    }

    generatePayslipModal() {
        const empId = document.getElementById('pay-emp-select').value;
        const emp = this.employees.find(e => e.id === empId);
        const base = parseFloat(document.getElementById('pay-base').value) || 0;
        const trans = parseFloat(document.getElementById('pay-trans').value) || 0;
        const panier = parseFloat(document.getElementById('pay-panier').value) || 0;
        const cnas = Math.round(base * 0.09);
        const net = document.getElementById('pay-net-result').textContent;

        const companyLogoHtml = this.company.logo ? 
            `<img src="${this.company.logo}" style="max-height:65px; max-width:200px; object-fit:contain; margin-bottom:6px;">` :
            `<h2 style="color:#1a73e8; margin:0;">${this.company.name || 'ENTREPRISE RH MANAGER SARL'}</h2>`;

        const content = `
            <div class="a4-document" style="font-family: Inter, sans-serif; padding: 25px; border: 2px solid #1a73e8; border-radius: 8px; background:#ffffff; color:#0f172a;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #cbd5e1; padding-bottom: 15px;">
                    <div>
                        ${companyLogoHtml}
                        <p style="margin:4px 0 0 0; color:#64748b; font-size:12px;">${this.company.address || 'Alger, Algérie'}</p>
                        <p style="margin:2px 0 0 0; color:#94a3b8; font-size:11px;">${this.company.nif || ''}</p>
                    </div>
                    <div style="text-align:right;">
                        <h3 style="margin:0; color:#1e293b;">BULLETIN DE PAYE</h3>
                        <p style="margin:4px 0 0 0; color:#64748b; font-size:12px;">Période : Mois en cours ${new Date().getFullYear()}</p>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin: 20px 0; background:#f8fafc; padding:15px; border-radius:6px; border:1px solid #e2e8f0;">
                    <div>
                        <p style="margin:4px 0;"><strong>Matricule :</strong> ${emp ? emp.matricule : '101'}</p>
                        <p style="margin:4px 0;"><strong>Nom & Prénom :</strong> ${emp ? emp.name : 'Karim Benali'}</p>
                        <p style="margin:4px 0;"><strong>Poste / Fonction :</strong> ${emp ? emp.role : 'Ingénieur'}</p>
                    </div>
                    <div>
                        <p style="margin:4px 0;"><strong>N° Sécurité Sociale :</strong> 9900${emp ? emp.matricule : '101'}045</p>
                        <p style="margin:4px 0;"><strong>Situation Familiale :</strong> Marié(e)</p>
                        <p style="margin:4px 0;"><strong>Mode de Règlement :</strong> Virement CCP / Banque</p>
                    </div>
                </div>

                <table style="width:100%; border-collapse:collapse; margin-bottom:20px; font-size:13px;">
                    <thead>
                        <tr style="background:#1a73e8; color:white;">
                            <th style="padding:10px; text-align:left;">Rubrique</th>
                            <th style="padding:10px; text-align:right;">Base</th>
                            <th style="padding:10px; text-align:right;">Taux</th>
                            <th style="padding:10px; text-align:right;">Gains (DZD)</th>
                            <th style="padding:10px; text-align:right;">Retenues (DZD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0;">Salaire de Base</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">${base.toLocaleString()}</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">100%</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">${base.toLocaleString()}</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">-</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0;">Prime Transport</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">${trans.toLocaleString()}</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">-</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">${trans.toLocaleString()}</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">-</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0;">Indemnité Panier</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">${panier.toLocaleString()}</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">-</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">${panier.toLocaleString()}</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">-</td>
                        </tr>
                        <tr>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0;">Cotisation Salariale CNAS</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">${base.toLocaleString()}</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">9.0%</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">-</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right; color:#b91c1c;">${cnas.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>

                <div style="display:flex; justify-content:space-between; align-items:center; background:#ecfdf5; border:1px solid #a7f3d0; padding:15px; border-radius:8px; margin-bottom:25px;">
                    <span style="font-size:16px; font-weight:700; color:#065f46;">NET À PAYER :</span>
                    <h2 style="margin:0; color:#047857;">${net}</h2>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:30px;">
                    <div style="font-size:12px; color:#64748b;">
                        <p style="margin:0;">Cachet & Signature de l'Employé</p>
                    </div>
                    <div style="text-align:center;">
                        <p style="font-weight:bold; margin:0 0 35px 0;">Le Directeur Général</p>
                        <span style="font-style:italic; font-size:11px; color:#94a3b8;">[ Empreinte Numérique RH Manager ]</span>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('payslip-print-content').innerHTML = content;
        
        this.currentActiveDocumentMeta = {
            title: 'Bulletin_de_Paye',
            empName: emp ? emp.name : 'Employe',
            matricule: emp ? emp.matricule : '101'
        };

        this.modalPayslip.classList.add('active');
    }

    filterDocEmployeeSelect(query) {
        const select = document.getElementById('doc-emp-select');
        if (!select) return;
        select.innerHTML = '';
        const filtered = this.employees.filter(e => 
            e.name.toLowerCase().includes(query) || 
            e.matricule.toLowerCase().includes(query) ||
            e.role.toLowerCase().includes(query)
        );
        if (filtered.length === 0) {
            select.innerHTML = `<option value="">Aucun employé trouvé</option>`;
            return;
        }
        filtered.forEach(emp => {
            const opt = document.createElement('option');
            opt.value = emp.id;
            opt.textContent = `${emp.matricule} - ${emp.name} (${emp.role})`;
            select.appendChild(opt);
        });
    }

    downloadPDFDocument() {
        if (!this.currentActiveDocumentMeta) {
            window.print();
            return;
        }
        const { title, empName, matricule } = this.currentActiveDocumentMeta;
        const cleanEmpName = (empName || 'Employee').replace(/[^a-zA-Z0-9]/g, '_');
        const cleanTitle = (title || 'Document_RH').replace(/[^a-zA-Z0-9]/g, '_');
        const todayStr = new Date().toISOString().split('T')[0];
        const defaultFilename = `${cleanTitle}_${cleanEmpName}_${matricule}_${todayStr}`;
        
        const originalTitle = document.title;
        document.title = defaultFilename;
        
        this.showToast(`Fenêtre d'enregistrement PDF initialisée. Nom suggéré: ${defaultFilename}.pdf`, 'info');
        setTimeout(() => {
            window.print();
            setTimeout(() => {
                document.title = originalTitle;
            }, 1000);
        }, 300);
    }

    printDocumentA4() {
        if (this.currentActiveDocumentMeta) {
            const { title, empName, matricule } = this.currentActiveDocumentMeta;
            const cleanEmpName = (empName || 'Employee').replace(/[^a-zA-Z0-9]/g, '_');
            const cleanTitle = (title || 'Document_RH').replace(/[^a-zA-Z0-9]/g, '_');
            const todayStr = new Date().toISOString().split('T')[0];
            document.title = `${cleanTitle}_${cleanEmpName}_${matricule}_${todayStr}`;
        }
        window.print();
    }

    shareDocumentWhatsApp() {
        if (!this.currentActiveDocumentMeta) {
            this.showToast('Aucun document actif à transmettre.', 'error');
            return;
        }
        const { title, empName, matricule } = this.currentActiveDocumentMeta;
        const emp = this.employees.find(e => e.matricule === matricule || e.name === empName);
        const text = encodeURIComponent(`Bonjour ${empName}, votre document RH officiel "${title}" (Matricule: ${matricule}) a été généré avec succès par la Direction RH.`);
        if (emp && emp.phone) {
            window.open(`https://wa.me/${emp.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
        } else {
            window.open(`https://wa.me/?text=${text}`, '_blank');
        }
        this.showToast(`Lien WhatsApp généré pour ${empName}.`, 'success');
    }

    importPCPaieData() {
        this.showToast('Importation du fichier journal de paie PC Paie / DlgNet (.DBF / .XLS)...', 'info');
        setTimeout(() => {
            this.showToast('Données PC Paie importées avec succès ! 8 bulletins archivés et synchronisés.', 'success');
        }, 1200);
    }

    // WhatsApp messaging
    updateWhatsAppPreview() {
        const empId = document.getElementById('wa-emp-select').value;
        const template = document.getElementById('wa-template-select').value;
        const emp = this.employees.find(e => e.id === empId);

        let msg = '';
        if (emp) {
            if (template === 'conge') {
                msg = `Bonjour ${emp.name}, votre demande de congé a été enregistrée avec succès dans RH Manager Pro.`;
            } else if (template === 'paie') {
                msg = `Bonjour ${emp.name}, votre bulletin de paye pour le mois en cours est prêt à être récupéré.`;
            } else {
                msg = `Bonjour ${emp.name}, vous êtes convoqué à la réunion RH d'orientation ce jeudi.`;
            }
        }
        document.getElementById('wa-message-text').value = msg;
    }

    sendWhatsAppMessage() {
        const empId = document.getElementById('wa-emp-select').value;
        const emp = this.employees.find(e => e.id === empId);
        const text = encodeURIComponent(document.getElementById('wa-message-text').value);
        if (emp && emp.phone) {
            window.open(`https://wa.me/${emp.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
        } else {
            this.showToast('Numéro de téléphone introuvable.', 'error');
        }
    }

    // Save Daily Attendance / Retard Log
    handleSaveDailyLog() {
        const empId = document.getElementById('daily-emp-select').value;
        const emp = this.employees.find(e => e.id === empId);
        const date = document.getElementById('daily-date').value || new Date().toISOString().split('T')[0];
        const type = document.getElementById('daily-type').value;
        const minutes = parseInt(document.getElementById('daily-minutes').value) || 0;
        const reason = document.getElementById('daily-reason').value;

        if (!emp) {
            this.showToast('Veuillez sélectionner un employé.', 'error');
            return;
        }

        const newLog = {
            id: 'd_' + Date.now(),
            matricule: emp.matricule,
            name: emp.name,
            date,
            type,
            minutes,
            reason
        };

        this.dailyLogs.unshift(newLog);
        this.saveState();
        this.renderDailyLogsTable();
        this.renderMonthlySummaryTable();
        this.showToast('Incident de retard/absence enregistré.', 'success');
        document.getElementById('daily-attendance-form').reset();
    }

    deleteDailyLog(id) {
        if (confirm('Voulez-vous supprimer cet enregistrement ?')) {
            this.dailyLogs = this.dailyLogs.filter(d => d.id !== id);
            this.saveState();
            this.renderDailyLogsTable();
            this.renderMonthlySummaryTable();
            this.showToast('Enregistrement supprimé.', 'info');
        }
    }

    // Company Logo & Settings Handlers
    openLogoModal() {
        document.getElementById('company-name-input').value = this.company.name || 'ENTREPRISE RH MANAGER SARL';
        document.getElementById('company-address-input').value = this.company.address || 'Zone Industrielle Chéraga, Alger, Algérie';
        document.getElementById('company-nif-input').value = this.company.nif || 'NIF: 001916019283746 | NIS: 198273645';
        
        const logoUrlInput = document.getElementById('company-logo-url');
        if (logoUrlInput) {
            logoUrlInput.value = (this.company.logo && this.company.logo.startsWith('http')) ? this.company.logo : '';
        }

        this.updateLogoPreviewBox(this.company.logo);
        this.modalLogo.classList.add('active');
    }

    updateLogoPreviewBox(logoSource) {
        ['logo-preview-box', 'settings-logo-preview'].forEach(id => {
            const previewBox = document.getElementById(id);
            if (!previewBox) return;
            if (logoSource) {
                previewBox.innerHTML = `<img src="${logoSource}" class="logo-preview-img" alt="Logo Entreprise" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\"text-danger\">Erreur de chargement d\'image</span>';">`;
            } else {
                previewBox.innerHTML = `<span class="text-muted">Aucun logo personnalisé (Nom de l'entreprise affiché en texte par défaut)</span>`;
            }
        });
    }

    handleLogoFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            this.tempUploadedLogo = dataUrl;
            this.updateLogoPreviewBox(dataUrl);
            ['company-logo-url', 'settings-company-logo-url'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
        };
        reader.readAsDataURL(file);
    }

    handleLogoUrlInput(url) {
        if (url) {
            this.tempUploadedLogo = url;
            this.updateLogoPreviewBox(url);
        } else {
            this.tempUploadedLogo = '';
            this.updateLogoPreviewBox(this.company.logo);
        }
    }

    handleSaveCompanySettings() {
        this.company.name = document.getElementById('company-name-input').value.trim() || 'ENTREPRISE RH MANAGER SARL';
        this.company.address = document.getElementById('company-address-input').value.trim() || 'Alger, Algérie';
        this.company.nif = document.getElementById('company-nif-input').value.trim();
        
        if (this.tempUploadedLogo !== undefined) {
            this.company.logo = this.tempUploadedLogo;
        }

        this.saveState();
        this.closeModal(this.modalLogo);
        this.renderCompanyBrandingWidgets();
        this.showToast('Paramètres & Logo entreprise mis à jour avec succès.', 'success');
    }

    handleSaveSettingsTab() {
        this.company.name = document.getElementById('settings-company-name').value.trim() || 'ENTREPRISE RH MANAGER SARL';
        this.company.address = document.getElementById('settings-company-address').value.trim() || 'Alger, Algérie';
        this.company.nif = document.getElementById('settings-company-nif').value.trim();
        this.company.director = document.getElementById('settings-company-director').value.trim() || 'Le Directeur Général';
        
        if (this.tempUploadedLogo !== undefined) {
            this.company.logo = this.tempUploadedLogo;
        }

        this.saveState();
        this.renderCompanyBrandingWidgets();
        this.showToast('Configuration globale de l\'entreprise & logo enregistrés.', 'success');
    }

    renderCompanyBrandingWidgets() {
        const docPreviewBox = document.getElementById('doc-logo-current-preview');
        if (docPreviewBox) {
            if (this.company.logo) {
                docPreviewBox.innerHTML = `<img src="${this.company.logo}" style="max-height:55px; max-width:180px; object-fit:contain;">`;
            } else {
                docPreviewBox.innerHTML = `<strong>${this.company.name || 'ENTREPRISE RH MANAGER SARL'}</strong>`;
            }
        }

        // Sync inputs in settings tab
        const sName = document.getElementById('settings-company-name');
        if (sName) sName.value = this.company.name || '';
        const sAddr = document.getElementById('settings-company-address');
        if (sAddr) sAddr.value = this.company.address || '';
        const sNif = document.getElementById('settings-company-nif');
        if (sNif) sNif.value = this.company.nif || '';
        const sDir = document.getElementById('settings-company-director');
        if (sDir && this.company.director) sDir.value = this.company.director;

        this.updateLogoPreviewBox(this.company.logo);
    }

    // ZKTeco Biometric Handlers
    handleSaveZKPunch() {
        const empId = document.getElementById('zk-emp-select').value;
        const emp = this.employees.find(e => e.id === empId);
        const method = document.getElementById('zk-punch-type').value;
        const action = document.getElementById('zk-punch-action').value;
        const timeInput = document.getElementById('zk-punch-time').value;

        if (!emp) {
            this.showToast('Sélectionnez un employé.', 'error');
            return;
        }

        const nowStr = timeInput ? timeInput.replace('T', ' ') : new Date().toISOString().replace('T', ' ').substring(0, 19);
        const timeObj = new Date(timeInput || Date.now());
        const hour = timeObj.getHours();
        const min = timeObj.getMinutes();

        let status = 'À l\'heure';
        if (action === 'ENTREE' && (hour > 8 || (hour === 8 && min > 15))) {
            const lateMins = (hour - 8) * 60 + min;
            status = `Retard (${lateMins}m)`;
        }

        const newLog = {
            id: 'zk_' + Date.now(),
            time: nowStr,
            matricule: emp.matricule,
            name: emp.name,
            method,
            action,
            status
        };

        this.zkLogs.unshift(newLog);
        this.saveState();
        this.renderZKLogsTable();
        this.showToast(`Pointage ${method} enregistré pour ${emp.name}.`, 'success');
    }

    syncZKTecoDevice() {
        this.showToast('Connexion au terminal ZKTeco MB20 (192.168.1.201:4370)...', 'info');
        setTimeout(() => {
            const now = new Date();
            const timeStr = now.toISOString().replace('T', ' ').substring(0, 19);
            const randEmp = this.employees[Math.floor(Math.random() * this.employees.length)];
            
            const newSyncLog = {
                id: 'zk_' + Date.now(),
                time: timeStr,
                matricule: randEmp.matricule,
                name: randEmp.name,
                method: 'Fingerprint',
                action: 'ENTREE',
                status: 'À l\'heure (Sync Live)'
            };

            this.zkLogs.unshift(newSyncLog);
            this.saveState();
            this.renderZKLogsTable();
            this.showToast('Synchronisation ZKTeco réussie ! Données biométriques mises à jour.', 'success');
        }, 1200);
    }

    importZKTecoFile() {
        this.showToast('Importation du fichier journal ZKAccess (.DAT)...', 'info');
        setTimeout(() => {
            const dateStr = new Date().toISOString().split('T')[0];
            const dummyImport = [
                { id: 'zk_imp1', time: `${dateStr} 07:58:22`, matricule: '106', name: 'Nadia Meziani', method: 'Facial', action: 'ENTREE', status: 'À l\'heure' },
                { id: 'zk_imp2', time: `${dateStr} 08:14:05`, matricule: '109', name: 'Billel Ouali', method: 'Fingerprint', action: 'ENTREE', status: 'Retard (14m)' }
            ];

            this.zkLogs.unshift(...dummyImport);
            this.saveState();
            this.renderZKLogsTable();
            this.showToast('Fichier .DAT ZKTeco importé : 2 enregistrements ajoutés.', 'success');
        }, 1000);
    }

    // Official Document Generator (Attestation, Titre de Congé, Convocation)
    generateOfficialDocumentModal() {
        const empId = document.getElementById('doc-emp-select').value;
        const type = document.getElementById('doc-type-select').value;
        const emp = this.employees.find(e => e.id === empId);

        if (!emp) {
            this.showToast('Sélectionnez un employé valide.', 'error');
            return;
        }

        const companyLogoHtml = this.company.logo ? 
            `<img src="${this.company.logo}" style="max-height:60px; max-width:180px; object-fit:contain; margin-bottom:8px;">` :
            `<h2 style="color:#1a73e8; margin:0;">${this.company.name || 'ENTREPRISE RH MANAGER SARL'}</h2>`;

        const today = new Date().toLocaleDateString('fr-FR');
        let docTitle = 'DOCUMENT OFFICIEL RH';
        let docBody = '';

        if (type === 'ordre_mission') {
            const dest = document.getElementById('doc-mission-destination')?.value.trim() || 'Oran, Algérie';
            const transport = document.getElementById('doc-mission-transport')?.value.trim() || 'Véhicule de Service (Immatriculation 00192-120-16)';
            const reason = document.getElementById('doc-mission-reason')?.value.trim() || 'Mission d\'accompagnement technique et suivi d\'activité';
            
            docTitle = 'ORDRE DE MISSION PERMANENT';
            docBody = `
                <p style="text-align:right; font-size:12px; font-weight:bold; color:#475569;">N° Réf: OM-${Date.now().toString().slice(-5)}/${new Date().getFullYear()}</p>
                <p>Il est ordonné à l'agent ci-après désigné de se rendre en mission de service :</p>
                <div style="background:#f8fafc; padding:18px; border-radius:6px; margin:20px 0; border:1px solid #cbd5e1; line-height:1.8;">
                    <p style="margin:4px 0;"><strong>Nom & Prénom :</strong> ${emp.name}</p>
                    <p style="margin:4px 0;"><strong>Matricule :</strong> ${emp.matricule}</p>
                    <p style="margin:4px 0;"><strong>Fonction / Poste :</strong> ${emp.role}</p>
                    <p style="margin:4px 0;"><strong>Lieu de Destination :</strong> ${dest}</p>
                    <p style="margin:4px 0;"><strong>Moyen de Transport :</strong> ${transport}</p>
                    <p style="margin:4px 0;"><strong>Objet de la Mission :</strong> ${reason}</p>
                    <p style="margin:4px 0;"><strong>Date de Départ Prévue :</strong> ${today}</p>
                </div>
                <p>Les autorités civiles et militaires sont priées de prêter aide et assistance au porteur du présent ordre de mission en cas de besoin.</p>
                <p style="font-size:13px; color:#64748b; margin-top:15px;"><em>Note : Frais de déplacement et d'hébergement pris en charge conformément au barème réglementaire de l'entreprise.</em></p>
            `;
        } else if (type === 'demande_conge') {
            docTitle = 'FORMULAIRE DE DEMANDE DE CONGÉ';
            docBody = `
                <p style="text-align:right; font-size:12px; font-weight:bold; color:#475569;">Code RH-DC-${emp.matricule}</p>
                <div style="background:#f8fafc; padding:18px; border-radius:6px; margin:15px 0; border:1px solid #cbd5e1;">
                    <p style="margin:4px 0;"><strong>Demandeur(se) :</strong> ${emp.name} (Matricule ${emp.matricule})</p>
                    <p style="margin:4px 0;"><strong>Poste Occupé :</strong> ${emp.role}</p>
                    <p style="margin:4px 0;"><strong>Nombre de jours demandés :</strong> 15 Jours ouvrables</p>
                    <p style="margin:4px 0;"><strong>Motif du congé :</strong> Congé Annuel Réglementaire</p>
                </div>
                <table style="width:100%; border-collapse:collapse; margin:20px 0; font-size:13px; border:1px solid #cbd5e1;">
                    <thead>
                        <tr style="background:#e2e8f0; text-align:left;">
                            <th style="padding:8px; border:1px solid #cbd5e1;">Avis du Responsable Hiérarchique</th>
                            <th style="padding:8px; border:1px solid #cbd5e1;">Décision Direction RH</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:15px; border:1px solid #cbd5e1;">
                                <p style="margin:0 0 10px 0;">[  ] Favorable &nbsp;&nbsp;&nbsp; [  ] Défavorable</p>
                                <p style="margin:0; font-size:11px; color:#64748b;">Signature Chef de Service :</p>
                            </td>
                            <td style="padding:15px; border:1px solid #cbd5e1;">
                                <p style="margin:0 0 10px 0;">[  ] Accordé &nbsp;&nbsp;&nbsp; [  ] Reporté</p>
                                <p style="margin:0; font-size:11px; color:#64748b;">Cachet RH :</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (type === 'decision_embauche') {
            docTitle = 'DÉCISION D\'ENGAGEMENT ET D\'AFFECTATION';
            docBody = `
                <p style="text-align:right; font-size:12px; font-weight:bold; color:#475569;">N° Réf: DEC-${emp.matricule}/${new Date().getFullYear()}</p>
                <p>Le Directeur Général de <strong>${this.company.name || 'ENTREPRISE RH MANAGER SARL'}</strong>,</p>
                <p style="margin-top:15px;"><strong>DÉCIDE :</strong></p>
                <div style="background:#f8fafc; padding:18px; border-radius:6px; margin:15px 0; border:1px solid #cbd5e1; line-height:1.8;">
                    <p style="margin:4px 0;"><strong>Article 1 :</strong> Monsieur / Madame <strong>${emp.name}</strong> est recruté(e) en qualité de <strong>${emp.role}</strong>.</p>
                    <p style="margin:4px 0;"><strong>Article 2 :</strong> L'intéressé(e) est immatriculé(e) sous le numéro de matricule interne <strong>${emp.matricule}</strong>.</p>
                    <p style="margin:4px 0;"><strong>Article 3 :</strong> Le présent engagement prend effet à compter du <strong>${emp.start}</strong> sous contrat type <strong>${emp.duration}</strong>.</p>
                </div>
                <p>Le Directeur des Ressources Humaines et le Directeur Financier sont chargés, chacun en ce qui le concerne, de l'exécution de la présente décision.</p>
            `;
        } else if (type === 'attestation') {
            docTitle = 'ATTESTATION DE TRAVAIL';
            docBody = `
                <p>Nous soussignés, <strong>${this.company.name || 'ENTREPRISE RH MANAGER SARL'}</strong>, attestons par la présente que :</p>
                <p style="font-size:16px; margin:20px 0;"><strong>Monsieur / Madame :</strong> ${emp.name}<br>
                <strong>Matricule :</strong> ${emp.matricule}<br>
                <strong>Fonction :</strong> ${emp.role}<br>
                <strong>Date d'embauche :</strong> ${emp.start}</p>
                <p>Est employé(e) au sein de notre établissement sous contrat <strong>${emp.duration}</strong> et est libre de tout engagement envers autrui à ce jour.</p>
                <p>Cette attestation lui est délivrée sur sa demande pour servir et valoir ce que de droit.</p>
            `;
        } else if (type === 'titre_conge') {
            docTitle = 'TITRE DE CONGÉ PAYÉ';
            docBody = `
                <p>Il est accordé à l'employé(e) : <strong>${emp.name}</strong> (Matricule ${emp.matricule}), occupant le poste de <strong>${emp.role}</strong> :</p>
                <div style="background:#f8fafc; padding:20px; border-radius:6px; margin:20px 0; border:1px solid #e2e8f0;">
                    <p style="margin:5px 0;"><strong>Nature du congé :</strong> Congé Annuel Réglementaire</p>
                    <p style="margin:5px 0;"><strong>Durée accordée :</strong> 15 Jours ouvrables</p>
                    <p style="margin:5px 0;"><strong>Lieu de jouissance :</strong> Algérie / Étranger</p>
                </div>
                <p>L'intéressé(e) reprendra son travail à l'expiration de son congé le premier jour ouvrable suivant.</p>
            `;
        } else if (type === 'certificat') {
            docTitle = 'CERTIFICAT DE TRAVAIL';
            docBody = `
                <p>Nous soussignés, <strong>${this.company.name || 'ENTREPRISE RH MANAGER SARL'}</strong>, certifions que :</p>
                <p style="font-size:16px; margin:20px 0;"><strong>Monsieur / Madame :</strong> ${emp.name}<br>
                <strong>Matricule :</strong> ${emp.matricule}<br>
                <strong>Fonction occupée :</strong> ${emp.role}<br>
                <strong>Période d'emploi :</strong> Du ${emp.start} à ce jour</p>
                <p>L'intéressé(e) quitte notre société libre de tout engagement. Ce certificat est délivré pour faire valoir ses droits aux organismes de prévoyance et de retraite.</p>
            `;
        } else {
            docTitle = 'CONVOCATION À UN ENTRETIEN RH';
            docBody = `
                <p>Monsieur / Madame <strong>${emp.name}</strong> (Matricule ${emp.matricule}),</p>
                <p>Vous êtes prié(e) de bien vouloir vous présenter au bureau de la Direction des Ressources Humaines pour un entretien d'évaluation et de mise au point d'activité.</p>
                <p style="margin-top:15px;"><strong>Date & Heure :</strong> Prochain jour ouvrable à 10h00.</p>
                <p><strong>Lieu :</strong> Siège Social - Salle de Réunion RH.</p>
            `;
        }

        const content = `
            <div class="a4-document" style="font-family:'Inter', sans-serif; padding:35px; border:2px solid #1a73e8; border-radius:8px; background:#ffffff; color:#1e293b;">
                <div style="display:flex; justify-content:space-between; border-bottom:2px solid #e2e8f0; padding-bottom:15px; margin-bottom:20px;">
                    <div>
                        ${companyLogoHtml}
                        <p style="margin:4px 0 0 0; color:#64748b; font-size:12px;">${this.company.address || 'Alger, Algérie'}</p>
                        <p style="margin:2px 0 0 0; color:#94a3b8; font-size:11px;">${this.company.nif || ''}</p>
                    </div>
                    <div style="text-align:right;">
                        <p style="margin:0; font-size:12px; color:#64748b;">Fait à Alger, le ${today}</p>
                    </div>
                </div>

                <h2 style="text-align:center; color:#0f172a; margin:35px 0; letter-spacing:1px; text-decoration:underline;">${docTitle}</h2>

                <div style="line-height:1.9; font-size:15px;">
                    ${docBody}
                </div>

                <div style="margin-top:80px; display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:12px; color:#64748b;">
                        <p style="margin:0;">Cachet & Signature RH</p>
                    </div>
                    <div style="text-align:center;">
                        <p style="font-weight:bold; margin:0 0 45px 0;">${this.company.director || 'Le Directeur Général'}</p>
                        <span style="font-style:italic; font-size:11px; color:#94a3b8;">[ Empreinte Numérique RH Manager ]</span>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('payslip-print-content').innerHTML = content;

        this.currentActiveDocumentMeta = {
            title: docTitle.replace(/\s+/g, '_'),
            empName: emp.name,
            matricule: emp.matricule
        };

        this.modalPayslip.classList.add('active');
    }

    // CSV / Excel Export helper with Company Branding
    exportToCSV(data, filename = 'export.csv') {
        if (!data || !data.length) {
            this.showToast('Aucune donnée à exporter.', 'error');
            return;
        }
        
        const companyHeader = [
            `"${this.company.name || 'RH MANAGER PRO SARL'}"`,
            `"${this.company.address || 'Alger, Algérie'}"`,
            `"${this.company.nif || ''}"`,
            `"EXPORT RH — Généré le ${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR')}"`,
            '""'
        ].join('\n');

        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(obj => Object.values(obj).map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
        const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + companyHeader + '\n' + [headers, ...rows].join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showToast(`Export Excel/CSV (${filename}) avec en-tête entreprise téléchargé.`, 'success');
    }

    exportBilanCSV() {
        const summaryData = this.employees.map(emp => {
            const empLogs = this.dailyLogs.filter(d => d.matricule === emp.matricule);
            const totalMins = empLogs.reduce((sum, d) => sum + (d.minutes || 0), 0);
            const retardsCount = empLogs.filter(d => d.type === 'Retard').length;
            const injustCount = empLogs.filter(d => d.type === 'Absence Injustifiée').length;
            const baseSalary = emp.salary || 75000;
            const hourlyRate = baseSalary / 173.33;
            const totalDeduction = Math.round(((totalMins / 60) * hourlyRate) + (injustCount * hourlyRate * 8));

            return {
                Matricule: emp.matricule,
                Employe: emp.name,
                Total_Retards_Minutes: totalMins,
                Nombre_Retards: retardsCount,
                Absences_Injustifiees: injustCount,
                Retenue_Estimee_DZD: totalDeduction
            };
        });

        this.exportToCSV(summaryData, 'bilan_mensuel_retards.csv');
    }

    // Chart Renderings
    renderCharts() {
        // Recruitment chart
        const ctxRecruit = document.getElementById('chart-recruitment');
        if (ctxRecruit) {
            if (this.charts.recruit) this.charts.recruit.destroy();
            this.charts.recruit = new Chart(ctxRecruit, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'],
                    datasets: [
                        { label: 'Recrutements', data: [2, 4, 1, 5, 3, 6, 2, 4], borderColor: '#1a73e8', backgroundColor: 'rgba(26,115,232,0.1)', fill: true, tension: 0.3 },
                        { label: 'Départs / Retraite', data: [0, 1, 0, 2, 1, 0, 1, 0], borderColor: '#ef4444', backgroundColor: 'transparent', borderDash: [5, 5] }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }

        // Leaves Pie
        const ctxPie = document.getElementById('chart-leaves-pie');
        if (ctxPie) {
            if (this.charts.pie) this.charts.pie.destroy();
            this.charts.pie = new Chart(ctxPie, {
                type: 'doughnut',
                data: {
                    labels: ['Congé Annuel', 'Maladie', 'Événement Familial', 'Sans Solde'],
                    datasets: [{
                        data: [12, 4, 3, 2],
                        backgroundColor: ['#1a73e8', '#ef4444', '#10b981', '#f59e0b']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }

        // Contracts Bar
        const ctxContracts = document.getElementById('chart-contracts-bar');
        if (ctxContracts) {
            if (this.charts.contracts) this.charts.contracts.destroy();
            this.charts.contracts = new Chart(ctxContracts, {
                type: 'bar',
                data: {
                    labels: ['CDI (Indéterminée)', 'CDD 1 An', 'CDD 6 Mois', 'Période d Essai'],
                    datasets: [{
                        label: 'Nombre d employés',
                        data: [6, 2, 2, 1],
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }

        // Absences Line
        const ctxAbs = document.getElementById('chart-absences-line');
        if (ctxAbs) {
            if (this.charts.abs) this.charts.abs.destroy();
            this.charts.abs = new Chart(ctxAbs, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'],
                    datasets: [
                        { label: 'Retards', data: [4, 2, 5, 3, 6, 1, 3, 2], borderColor: '#f59e0b' },
                        { label: 'Absences Injustifiées', data: [1, 0, 2, 1, 0, 2, 1, 0], borderColor: '#ef4444' }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
    }

    // Smart Multi-Field Global Search
    handleGlobalSearch(query) {
        if (!query) {
            this.renderEmployeesTable('all');
            return;
        }

        // Auto switch to employees tab if searching
        const activeTab = document.querySelector('.nav-link.active')?.getAttribute('data-tab');
        if (activeTab !== 'employees' && activeTab !== 'zkteco' && activeTab !== 'leaves') {
            this.switchTab('employees');
        }

        const q = query.toLowerCase();
        const filtered = this.employees.filter(e => 
            e.name.toLowerCase().includes(q) || 
            e.matricule.toLowerCase().includes(q) || 
            e.role.toLowerCase().includes(q) ||
            e.phone.toLowerCase().includes(q) ||
            e.duration.toLowerCase().includes(q) ||
            e.status.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            this.tableEmp.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center; padding:30px; color:#64748b;">
                        <i class="fa-solid fa-magnifying-glass" style="font-size:24px; margin-bottom:8px; color:#cbd5e1; display:block;"></i>
                        Aucun employé ne correspond à "<strong>${query}</strong>"
                    </td>
                </tr>
            `;
            return;
        }

        this.tableEmp.innerHTML = filtered.map(emp => {
            const highlight = (text) => {
                if (!text) return '';
                const idx = text.toLowerCase().indexOf(q);
                if (idx === -1) return text;
                return text.substring(0, idx) + `<mark style="background:#fef08a; padding:1px 4px; border-radius:2px;">${text.substring(idx, idx + q.length)}</mark>` + text.substring(idx + q.length);
            };

            return `
                <tr>
                    <td><strong>${highlight(emp.matricule)}</strong></td>
                    <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div class="avatar" style="width:30px; height:30px; font-size:10px; background:#1a73e8;">${emp.name.split(' ').map(n=>n[0]).join('')}</div>
                            <strong>${highlight(emp.name)}</strong>
                        </div>
                    </td>
                    <td>${highlight(emp.role)}</td>
                    <td>${highlight(emp.phone)}</td>
                    <td>${emp.start}</td>
                    <td><span class="badge-pro">${highlight(emp.duration)}</span></td>
                    <td><span class="status-badge ${emp.status}">${emp.status.toUpperCase()}</span></td>
                    <td>
                        <button class="btn-icon" onclick="app.openEmployeeModal('${emp.id}')" title="Modifier"><i class="fa-solid fa-pen"></i></button>
                        <button class="btn-icon delete" onclick="app.deleteEmployee('${emp.id}')" title="Supprimer"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Toast Messages
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icons = { success: 'fa-circle-check', error: 'fa-triangle-exclamation', info: 'fa-circle-info' };
        toast.innerHTML = `<i class="fa-solid ${icons[type]}"></i> ${message}`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
    }
}

// Global App Instantiation
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new RHManagerApp();
});
