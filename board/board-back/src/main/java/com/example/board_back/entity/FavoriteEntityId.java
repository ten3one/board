package com.example.board_back.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class FavoriteEntityId implements java.io.Serializable {
    private static final long serialVersionUID = 6300809705239260379L;
    @Size(max = 50)
    @NotNull
    @Column(name = "user_email", nullable = false, length = 50)
    private String userEmail;

    @NotNull
    @Column(name = "board_number", nullable = false)
    private Integer boardNumber;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
            return false;
        FavoriteEntityId entity = (FavoriteEntityId) o;
        return Objects.equals(this.userEmail, entity.userEmail) &&
                Objects.equals(this.boardNumber, entity.boardNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userEmail, boardNumber);
    }

}