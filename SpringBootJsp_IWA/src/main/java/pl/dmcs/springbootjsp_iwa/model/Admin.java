package pl.dmcs.springbootjsp_iwa.model;

import javax.persistence.*;

@Entity
public class Admin {

    @Id
    @GeneratedValue
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    public Admin() {
    }

    public Admin(User user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
