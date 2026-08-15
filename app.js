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

// App State Management
class RHManagerApp {
    constructor() {
        this.employees = JSON.parse(localStorage.getItem('rh_employees')) || INITIAL_EMPLOYEES;
        this.leaves = JSON.parse(localStorage.getItem('rh_leaves')) || INITIAL_LEAVES;
        this.charts = {};
        
        this.initDOM();
        this.initEvents();
        this.renderAll();
    }

    saveState() {
        localStorage.setItem('rh_employees', JSON.stringify(this.employees));
        localStorage.setItem('rh_leaves', JSON.stringify(this.leaves));
    }

    initDOM() {
        // Tab elements
        this.navLinks = document.querySelectorAll('.nav-link');
        this.tabPanels = document.querySelectorAll('.tab-panel');
        
        // Modals
        this.modalEmp = document.getElementById('modal-employee');
        this.modalPayslip = document.getElementById('modal-payslip');
        
        // KPI elements
        this.kpiTotal = document.getElementById('kpi-total-emp');
        this.kpiActive = document.getElementById('kpi-active-emp');
        this.kpiLeave = document.getElementById('kpi-on-leave');
        this.kpiPayroll = document.getElementById('kpi-payroll');
        
        // Tables
        this.tableEmp = document.getElementById('table-employees').querySelector('tbody');
        this.tableDashLeaves = document.getElementById('table-dashboard-leaves').querySelector('tbody');
        this.tableLeavesHist = document.getElementById('table-leaves-history').querySelector('tbody');
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

        // Global search
        document.getElementById('global-search').addEventListener('input', (e) => {
            this.handleGlobalSearch(e.target.value.toLowerCase());
        });

        // Quick Add Employee buttons
        document.getElementById('quick-add-emp-btn').addEventListener('click', () => this.openEmployeeModal());
        document.getElementById('add-emp-btn').addEventListener('click', () => this.openEmployeeModal());
        
        // Modal cancel/close
        document.getElementById('modal-emp-close').addEventListener('click', () => this.closeModal(this.modalEmp));
        document.getElementById('modal-emp-cancel').addEventListener('click', () => this.closeModal(this.modalEmp));
        document.getElementById('modal-payslip-close').addEventListener('click', () => this.closeModal(this.modalPayslip));
        document.getElementById('modal-payslip-close-btn').addEventListener('click', () => this.closeModal(this.modalPayslip));

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

        // Leave duration date auto-calculator
        document.getElementById('leave-start-date').addEventListener('change', () => this.calcLeaveEnd());
        document.getElementById('leave-days').addEventListener('input', () => this.calcLeaveEnd());

        // Payroll calculator
        document.getElementById('pay-emp-select').addEventListener('change', (e) => this.updatePayrollCalc(e.target.value));
        document.getElementById('pay-base').addEventListener('input', () => this.calcPayrollNet());
        document.getElementById('pay-trans').addEventListener('input', () => this.calcPayrollNet());
        document.getElementById('pay-panier').addEventListener('input', () => this.calcPayrollNet());
        document.getElementById('generate-payslip-btn').addEventListener('click', () => this.generatePayslipModal());

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
                this.saveState();
                this.renderAll();
                this.showToast('Données réinitialisées.', 'info');
            }
        });
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
                'analytics': 'Statistiques & Bilan RH',
                'finance': 'Finance & Fiches de Paye (Algérie)',
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
                <td><button class="btn-secondary btn-sm" onclick="app.switchTab('employees')">Renouveler</button></td>
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

    populateDropdowns() {
        const empOptions = this.employees.map(e => `<option value="${e.id}">${e.matricule} - ${e.name}</option>`).join('');
        document.getElementById('leave-emp-select').innerHTML = empOptions;
        document.getElementById('pay-emp-select').innerHTML = empOptions;
        document.getElementById('wa-emp-select').innerHTML = empOptions;
        
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

        const content = `
            <div style="font-family: Inter, sans-serif; padding: 20px; border: 2px solid #1a73e8; border-radius: 8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #cbd5e1; padding-bottom: 15px;">
                    <div>
                        <h2 style="color:#1a73e8; margin:0;">ENTREPRISE RH MANAGER SARL</h2>
                        <p style="margin:4px 0 0 0; color:#64748b; font-size:12px;">Zone Industrielle Chéraga, Alger, Algérie</p>
                    </div>
                    <div style="text-align:right;">
                        <h3 style="margin:0;">BULLETIN DE PAYE</h3>
                        <p style="margin:4px 0 0 0; color:#64748b; font-size:12px;">Période : Mois en cours ${new Date().getFullYear()}</p>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin: 20px 0; background:#f8fafc; padding:15px; border-radius:6px;">
                    <div>
                        <p><strong>Matricule :</strong> ${emp ? emp.matricule : '101'}</p>
                        <p><strong>Nom & Prénom :</strong> ${emp ? emp.name : 'Karim Benali'}</p>
                        <p><strong>Poste / Fonction :</strong> ${emp ? emp.role : 'Ingénieur'}</p>
                    </div>
                    <div>
                        <p><strong>N° Sécurité Sociale :</strong> 9900${emp ? emp.matricule : '101'}045</p>
                        <p><strong>Situation Familiale :</strong> Marié(e)</p>
                        <p><strong>Mode de Règlement :</strong> Virement CCP / Banque</p>
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
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0;">Cotisation Salariale CNAS</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">${base.toLocaleString()}</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">9.0%</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">-</td>
                            <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right; color:#b91c1c;">${cnas.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>

                <div style="display:flex; justify-content:space-between; align-items:center; background:#ecfdf5; border:1px solid #a7f3d0; padding:15px; border-radius:8px;">
                    <span style="font-size:16px; font-weight:700; color:#065f46;">NET À PAYER :</span>
                    <h2 style="margin:0; color:#047857;">${net}</h2>
                </div>
            </div>
        `;
        document.getElementById('payslip-print-content').innerHTML = content;
        this.modalPayslip.classList.add('active');
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

    // Global Search
    handleGlobalSearch(query) {
        if (!query) {
            this.renderEmployeesTable('all');
            return;
        }
        const filtered = this.employees.filter(e => 
            e.name.toLowerCase().includes(query) || 
            e.matricule.toLowerCase().includes(query) || 
            e.role.toLowerCase().includes(query)
        );

        this.tableEmp.innerHTML = filtered.map(emp => `
            <tr>
                <td><strong>${emp.matricule}</strong></td>
                <td><strong>${emp.name}</strong></td>
                <td>${emp.role}</td>
                <td>${emp.phone}</td>
                <td>${emp.start}</td>
                <td><span class="badge-pro">${emp.duration}</span></td>
                <td><span class="status-badge ${emp.status}">${emp.status.toUpperCase()}</span></td>
                <td><button class="btn-icon" onclick="app.openEmployeeModal('${emp.id}')"><i class="fa-solid fa-pen"></i></button></td>
            </tr>
        `).join('');
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
