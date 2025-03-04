import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client.interface';
import { ClientGetAll } from '../../api/client.get';
import { MatDialog } from '@angular/material/dialog';
import { ClientGetOne } from '../../api/client.getOne';
import { ClientPut } from '../../api/client.put';
import { DeleteClient } from '../../api/client.delete';

@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css'
})
export class ListClientsComponent  implements OnInit{
    clients: Client[] = [];
  constructor(private getClient:ClientGetAll,
    private dialog: MatDialog,
    private clientGet: ClientGetOne,
    private clientPut: ClientPut,
    private clientDelete:DeleteClient
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.getClient.getClients().subscribe(data => {
      this.clients = data;}
    );
  }

  editClient(client: Client): void {}

  
  deleteClient(id: number): void {
    this.clientDelete.deleteClient
  }
}
