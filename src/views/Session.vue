<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="sessions"
      sort-by="date"
      group-by="date"
      show-group-by
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Sessions</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >New Session</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="editedItem.date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date"
                            label="Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.duration"
                        label="Duration"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.client"
                        label="Client"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Price"
                        type="number"
                        suffix="€"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.paid"
                        label="Paid"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.date="{ item }">
        <span>{{ new Date(item.date).toLocaleString() }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Date",
        align: "start",
        value: "date",
      },
      { text: "Client", value: "client" },
      {
        text: "Duration",
        value: "duration",
        sortable: false,
        groupable: false,
      },
      { text: "Price", value: "price", sortable: false, groupable: false },
      { text: "Paid", value: "paid", sortable: false, groupable: false },
      { text: "Actions", value: "actions", sortable: false, groupable: false },
    ],
    sessions: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.sessions = [
        {
          date: "11/08/2020",
          duration: 159,
          client: 6.0,
          price: 24,
          paid: 4.0,
        },
        {
          date: "12/09/2020",
          duration: 159,
          client: 6.0,
          price: 24,
          paid: 4.0,
        },
        {
          date: "11/08/2020",
          duration: 159,
          client: 6.0,
          price: 24,
          paid: 4.0,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.sessions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.sessions.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.sessions.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.sessions[this.editedIndex], this.editedItem);
      } else {
        this.sessions.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
