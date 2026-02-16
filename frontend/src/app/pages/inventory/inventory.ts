import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartService, Part, DashboardSummary, StockMovement } from '../../services/part.service';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit {
  parts = signal<Part[]>([]);
  dashboard = signal<DashboardSummary>({ totalParts: 0, lowStockCount: 0, totalInventoryValue: 0 });
  history = signal<StockMovement[]>([]);
  loading = signal(true);
  successMsg = signal('');
  errorMsg = signal('');

  // Modal state
  showAddModal = signal(false);
  showRemoveModal = signal(false);
  selectedPart = signal<Part | null>(null);
  modalQuantity = 1;
  modalReason = 'Used in Service';
  modalLoading = signal(false);

  constructor(private partService: PartService) { }

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    this.loading.set(true);
    let completed = 0;
    const checkDone = () => { completed++; if (completed >= 3) this.loading.set(false); };

    this.partService.getParts().subscribe({
      next: (data) => this.parts.set(data),
      error: () => this.errorMsg.set('Failed to load parts'),
      complete: checkDone,
    });

    this.partService.getDashboard().subscribe({
      next: (data) => this.dashboard.set(data),
      error: () => { },
      complete: checkDone,
    });

    this.partService.getHistory().subscribe({
      next: (data) => this.history.set(data),
      error: () => { },
      complete: checkDone,
    });
  }

  isLowStock(part: Part): boolean {
    return part.quantity < part.minLevel;
  }

  // --- Add Stock Modal ---
  openAddModal(part: Part) {
    this.selectedPart.set(part);
    this.modalQuantity = 1;
    this.showAddModal.set(true);
  }

  confirmAddStock() {
    const part = this.selectedPart();
    if (!part || this.modalQuantity <= 0) return;

    this.modalLoading.set(true);
    this.partService.addStock(part._id, this.modalQuantity).subscribe({
      next: () => {
        this.modalLoading.set(false);
        this.showAddModal.set(false);
        this.successMsg.set(`Added ${this.modalQuantity} units to "${part.name}"`);
        this.clearMsgAfterDelay();
        this.loadAllData();
      },
      error: (err) => {
        this.modalLoading.set(false);
        this.errorMsg.set(err?.error?.message || 'Failed to add stock');
        this.clearMsgAfterDelay();
      }
    });
  }

  // --- Remove Stock Modal ---
  openRemoveModal(part: Part) {
    this.selectedPart.set(part);
    this.modalQuantity = 1;
    this.modalReason = 'Used in Service';
    this.showRemoveModal.set(true);
  }

  confirmRemoveStock() {
    const part = this.selectedPart();
    if (!part || this.modalQuantity <= 0) return;

    this.modalLoading.set(true);
    this.partService.removeStock(part._id, this.modalQuantity, this.modalReason).subscribe({
      next: () => {
        this.modalLoading.set(false);
        this.showRemoveModal.set(false);
        this.successMsg.set(`Removed ${this.modalQuantity} units from "${part.name}"`);
        this.clearMsgAfterDelay();
        this.loadAllData();
      },
      error: (err) => {
        this.modalLoading.set(false);
        this.errorMsg.set(err?.error?.message || 'Failed to remove stock');
        this.clearMsgAfterDelay();
      }
    });
  }

  closeModals() {
    this.showAddModal.set(false);
    this.showRemoveModal.set(false);
  }

  private clearMsgAfterDelay() {
    setTimeout(() => {
      this.successMsg.set('');
      this.errorMsg.set('');
    }, 4000);
  }
}
