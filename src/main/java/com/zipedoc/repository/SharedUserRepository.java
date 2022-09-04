package com.zipedoc.repository;

import com.zipedoc.domain.SharedUser;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SharedUser entity.
 */
@Repository
public interface SharedUserRepository extends JpaRepository<SharedUser, Long> {
    // default List<SharedUser> findAllByUserNameIsSharedUser() {
    //     return findAllByUserNameIsSharedUser();
    // }

    default Optional<SharedUser> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<SharedUser> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<SharedUser> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct sharedUser from SharedUser sharedUser left join fetch sharedUser.title",
        countQuery = "select count(distinct sharedUser) from SharedUser sharedUser"
    )
    Page<SharedUser> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct sharedUser from SharedUser sharedUser left join fetch sharedUser.title")
    List<SharedUser> findAllWithToOneRelationships();

    @Query("select sharedUser from SharedUser sharedUser left join fetch sharedUser.title where sharedUser.id =:id")
    Optional<SharedUser> findOneWithToOneRelationships(@Param("id") Long id);
}
