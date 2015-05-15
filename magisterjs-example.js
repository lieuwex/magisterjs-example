if (Meteor.isClient) {
	function setAppointments (e, r) {
		Session.set("appointments", {
			error: e,
			result: r
		});
	}

	function fetchAppointments (schoolname, username, password) {
		new Magister.Magister(schoolname, username, password).ready(function (error) {
			if (error) {
				setAppointments(e, null);
			} else {
				Session.set("name", this.profileInfo().firstName());

				this.appointments(new Date(), new Date(), function (e, r) {
					if (e) {
						setAppointments(e, null);
					} else {
						var appointments = r.map(function (a) {
							return a.description();
						});

						setAppointments(e, appointments);
					}
				})
			}
		});
	}

	Template.main.helpers({
		name: function () {
			return Session.get("name");
		},

		appointments: function () {
			return Session.get("appointments");
		}
	});

	Template.main.events({
		"click button": function (event) {
			var schoolname = $("#schoolname").val();
			var username = $("#username").val();
			var password = $("#password").val();

			fetchAppointments(schoolname, username, password);
		}
	})
}
